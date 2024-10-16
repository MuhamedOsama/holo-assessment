import { Module } from '@nestjs/common';
import { SpecialOfferService } from './special-offer.service';
import { SpecialOfferController } from './special-offer.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SpecialOfferController],
  providers: [SpecialOfferService],
  exports: [SpecialOfferService],
})
export class SpecialOfferModule {}
