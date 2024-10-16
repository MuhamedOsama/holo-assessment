import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { customAlphabet } from 'nanoid';
import { SpecialOfferService } from '../special-offer/special-offer.service';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class VoucherService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly specialOfferService: SpecialOfferService,
    private readonly customerService: CustomerService,
  ) {}

  async generateVoucher(
    customerId: string,
    offerId: string,
    expirationDate: Date,
  ) {
    // To ensure that customer and offer validation, as well as voucher creation, are atomic
    return await this.prismaService.$transaction(async (prisma) => {
      // Check if customer and offer exist
      await this.customerService.checkCustomerExists(customerId);
      await this.specialOfferService.checkOfferExists(offerId);

      // Generate the code
      const code = this.generateVoucherCode();

      // Create the voucher
      return prisma.voucherCode.create({
        data: {
          code,
          customerId,
          specialOfferId: offerId,
          expirationDate,
        },
      });
    });
  }

  async redeemVoucher(code: string, email: string) {
    // To guarantee that the voucher is marked as used only after validation and avoid partial updates.
    return await this.prismaService.$transaction(async (prisma) => {
      const voucher = await prisma.voucherCode.findFirst({
        where: {
          code,
          customer: { email },
          isUsed: false,
          expirationDate: { gte: new Date() },
        },
      });

      if (!voucher) {
        throw new BadRequestException('Invalid or expired voucher');
      }

      // Update the voucher to mark it as used
      return prisma.voucherCode.update({
        where: { id: voucher.id },
        data: { isUsed: true, dateUsed: new Date() },
      });
    });
  }

  async getCustomerVouchers(email: string) {
    return this.prismaService.voucherCode.findMany({
      where: {
        customer: { email },
        isUsed: false,
        expirationDate: { gte: new Date() },
      },
      include: { specialOffer: true },
    });
  }

  public generateVoucherCode(): string {
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nanoid = customAlphabet(alphabet, 8);
    return nanoid();
  }
  async generateUniqueVoucherCode(): Promise<string> {
    // To prevent race conditions when generating unique voucher codes in a multi-user scenario.
    return await this.prismaService.$transaction(async (prisma) => {
      let code: string;
      let isUnique = false;

      while (!isUnique) {
        code = this.generateVoucherCode();
        const existingVoucher = await prisma.voucherCode.findUnique({
          where: { code },
        });
        isUnique = !existingVoucher;
      }

      return code;
    });
  }
}
