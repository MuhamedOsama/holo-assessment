import { Test, TestingModule } from '@nestjs/testing';
import { SpecialOfferService } from './special-offer.service';
import { PrismaService } from '../prisma/prisma.service';

describe('SpecialOfferService', () => {
  let service: SpecialOfferService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    specialOffer: {
      findMany: jest.fn(() => [
        { id: '1', name: 'Buy 1 Get 1 Free', discount: 50 },
      ]),
      create: jest.fn((data) => ({ id: '1', ...data.data })),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpecialOfferService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<SpecialOfferService>(SpecialOfferService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all special offers', async () => {
    const offers = await service.getAllSpecialOffers();
    expect(offers).toEqual([
      { id: '1', name: 'Buy 1 Get 1 Free', discount: 50 },
    ]);
    expect(prismaService.specialOffer.findMany).toHaveBeenCalled();
  });

  it('should create a new special offer', async () => {
    const data = { name: 'Buy 2 Get 1 Free', discountPercentage: 33 };
    const offer = await service.createSpecialOffer(data);
    expect(offer).toEqual({ id: '1', ...data });
    expect(prismaService.specialOffer.create).toHaveBeenCalledWith({ data });
  });
});
