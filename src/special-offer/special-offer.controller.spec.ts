import { Test, TestingModule } from '@nestjs/testing';
import { SpecialOfferController } from './special-offer.controller';
import { SpecialOfferService } from './special-offer.service';

describe('SpecialOfferController', () => {
  let controller: SpecialOfferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecialOfferController],
      providers: [SpecialOfferService],
    }).compile();

    controller = module.get<SpecialOfferController>(SpecialOfferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
