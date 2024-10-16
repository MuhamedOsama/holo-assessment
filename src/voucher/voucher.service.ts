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
    // Check if customer and offer exist
    await this.customerService.checkCustomerExists(customerId);
    await this.specialOfferService.checkOfferExists(offerId);
    // generate the code
    const code = this.generateVoucherCode();
    return this.prismaService.voucherCode.create({
      data: {
        code,
        customerId,
        specialOfferId: offerId,
        expirationDate,
      },
    });
  }

  async redeemVoucher(code: string, email: string) {
    const voucher = await this.prismaService.voucherCode.findFirst({
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

    return this.prismaService.voucherCode.update({
      where: { id: voucher.id },
      data: { isUsed: true, dateUsed: new Date() },
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
    let code: string;
    let isUnique = false;

    while (!isUnique) {
      code = this.generateVoucherCode();
      const existingVoucher = await this.prismaService.voucherCode.findUnique({
        where: { code },
      });
      isUnique = !existingVoucher;
    }

    return code;
  }
}
