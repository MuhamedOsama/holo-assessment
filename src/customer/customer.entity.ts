import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '@prisma/client';
import { VoucherEntity } from '../voucher/voucher.entity';

export class CustomerEntity implements Customer {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  vouchers: VoucherEntity[];
}
