import { ApiProperty } from '@nestjs/swagger';
import { SpecialOffer } from '@prisma/client';
import { VoucherEntity } from '../voucher/voucher.entity';

export class SpecialOfferEntity implements SpecialOffer {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  discountPercentage: number;
  vouchers: VoucherEntity[];
}
