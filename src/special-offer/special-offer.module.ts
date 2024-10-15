import { Module } from '@nestjs/common';
import { SpecialOfferService } from './special-offer.service';
import { SpecialOfferController } from './special-offer.controller';

@Module({
  controllers: [SpecialOfferController],
  providers: [SpecialOfferService],
})
export class SpecialOfferModule {}
