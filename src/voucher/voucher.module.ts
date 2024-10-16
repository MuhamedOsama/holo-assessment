import { Module } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { VoucherController } from './voucher.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CustomerModule } from '../customer/customer.module';
import { CustomerService } from '../customer/customer.service';
import { SpecialOfferModule } from '../special-offer/special-offer.module';
import { SpecialOfferService } from '../special-offer/special-offer.service';

@Module({
  imports: [PrismaModule, SpecialOfferModule, CustomerModule],
  controllers: [VoucherController],
  providers: [VoucherService, CustomerService, SpecialOfferService],
})
export class VoucherModule {}
