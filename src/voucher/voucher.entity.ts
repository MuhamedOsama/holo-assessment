import { ApiProperty } from '@nestjs/swagger';
import { VoucherCode } from '@prisma/client';
import { SpecialOfferEntity } from '../special-offer/special-offer.entity';
export class VoucherEntity implements VoucherCode {
  @ApiProperty()
  id: string;
  @ApiProperty()
  code: string;
  @ApiProperty()
  customerId: string;
  @ApiProperty()
  specialOfferId: string;
  @ApiProperty()
  expirationDate: Date;
  @ApiProperty({ required: false })
  dateUsed: Date | null;
  @ApiProperty()
  isUsed: boolean;
  @ApiProperty({ type: () => SpecialOfferEntity })
  specialOffer: SpecialOfferEntity; // Include the related special offer
}
