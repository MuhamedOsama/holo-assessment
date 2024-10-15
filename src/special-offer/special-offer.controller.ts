import { Controller } from '@nestjs/common';
import { SpecialOfferService } from './special-offer.service';

@Controller('special-offer')
export class SpecialOfferController {
  constructor(private readonly specialOfferService: SpecialOfferService) {}
}
