import { Test, TestingModule } from '@nestjs/testing';
import { SpecialOfferService } from './special-offer.service';

describe('SpecialOfferService', () => {
  let service: SpecialOfferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecialOfferService],
    }).compile();

    service = module.get<SpecialOfferService>(SpecialOfferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
