import { Controller, Get, Post, Body } from '@nestjs/common';
import { SpecialOfferService } from './special-offer.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateSpecialOfferDto } from './dto/create-special-offer.dto';
@ApiTags('special-offers')
@Controller('special-offer')
export class SpecialOfferController {
  constructor(private readonly specialOfferService: SpecialOfferService) {}

  @Get()
  async getAllSpecialOffers() {
    return this.specialOfferService.getAllSpecialOffers();
  }

  @Post()
  async createSpecialOffer(
    @Body() createSpecialOfferDto: CreateSpecialOfferDto,
  ) {
    return this.specialOfferService.createSpecialOffer(createSpecialOfferDto);
  }
}
