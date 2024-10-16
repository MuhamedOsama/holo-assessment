import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SpecialOfferService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllSpecialOffers() {
    return this.prismaService.specialOffer.findMany();
  }

  async createSpecialOffer(data: { name: string; discountPercentage: number }) {
    return this.prismaService.specialOffer.create({ data });
  }
  async checkOfferExists(offerId: string) {
    const offer = await this.prismaService.specialOffer.findUnique({
      where: { id: offerId },
    });
    if (!offer) {
      throw new NotFoundException(`Offer with ID ${offerId} not found`);
    }
    return offer;
  }
}
