import { Module } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { VoucherController } from './voucher.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CustomerModule } from '../customer/customer.module';
import { CustomerService } from '../customer/customer.service';
import { SpecialOfferModule } from '../special-offer/special-offer.module';
import { SpecialOfferService } from '../special-offer/special-offer.service';
import {
  minutes,
  seconds,
  ThrottlerGuard,
  ThrottlerModule,
} from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    // i feel like we only need to throttle this module specifically the generateVoucher method
    // but this can be easily changed later
    ThrottlerModule.forRoot([
      {
        ttl: minutes(1),
        limit: 5, // why would a user redeems more than 5 vouchers in a minute ?
        blockDuration: seconds(10), // block for 10 seconds
      },
    ]),
    PrismaModule,
    SpecialOfferModule,
    CustomerModule,
  ],
  controllers: [VoucherController],
  providers: [
    VoucherService,
    {
      provide: APP_GUARD,
      useClass: class extends ThrottlerGuard {
        protected async getTracker(req: Record<string, any>): Promise<string> {
          // use x-forwarded-for if available, otherwise use default IP
          // need to configure nginx or whatever reverse proxt we will use to pass the X-Forwarded-For header
          const xForwardedFor = req.headers['x-forwarded-for'];
          return Array.isArray(xForwardedFor)
            ? xForwardedFor[0]
            : xForwardedFor || req.ip;
        }
      },
    },
    CustomerService,
    SpecialOfferService,
  ],
})
export class VoucherModule {}
