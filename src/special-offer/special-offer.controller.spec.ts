import { Test, TestingModule } from '@nestjs/testing';
import { SpecialOfferController } from './special-offer.controller';
import { SpecialOfferService } from './special-offer.service';
import { CreateSpecialOfferDto } from './dto/create-special-offer.dto';

describe('SpecialOfferController', () => {
  let controller: SpecialOfferController;
  let service: SpecialOfferService;

  const mockSpecialOfferService = {
    getAllSpecialOffers: jest.fn(() => [
      { id: '1', name: 'Buy 1 Get 1 Free', discountPercentage: 50 },
    ]),
    createSpecialOffer: jest.fn((dto: CreateSpecialOfferDto) => ({
      id: '1',
      ...dto,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecialOfferController],
      providers: [
        {
          provide: SpecialOfferService,
          useValue: mockSpecialOfferService,
        },
      ],
    }).compile();

    controller = module.get<SpecialOfferController>(SpecialOfferController);
    service = module.get<SpecialOfferService>(SpecialOfferService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all special offers', async () => {
    const result = await controller.getAllSpecialOffers();
    expect(result).toEqual([
      { id: '1', name: 'Buy 1 Get 1 Free', discountPercentage: 50 },
    ]);
    expect(service.getAllSpecialOffers).toHaveBeenCalled();
  });

  it('should create a new special offer', async () => {
    const dto: CreateSpecialOfferDto = {
      name: 'Buy 2 Get 1 Free',
      discountPercentage: 33,
    };
    const result = await controller.createSpecialOffer(dto);
    expect(result).toEqual({ id: '1', ...dto });
    expect(service.createSpecialOffer).toHaveBeenCalledWith(dto);
  });
});
