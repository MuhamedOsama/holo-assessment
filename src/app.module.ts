import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { SpecialOfferModule } from './special-offer/special-offer.module';
import { VoucherModule } from './voucher/voucher.module';

@Module({
  imports: [CustomerModule, SpecialOfferModule, VoucherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
