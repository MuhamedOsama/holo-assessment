import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { PrismaService } from '../prisma/prisma.service';

describe('CustomerService', () => {
  let service: CustomerService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    customer: {
      findMany: jest.fn(() => [
        { id: '1', name: 'John Doe', email: 'john@example.com' },
      ]),
      create: jest.fn((data) => ({ id: '1', ...data.data })),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all customers', async () => {
    const customers = await service.getAllCustomers();
    expect(customers).toEqual([
      { id: '1', name: 'John Doe', email: 'john@example.com' },
    ]);
    expect(prismaService.customer.findMany).toHaveBeenCalled();
  });

  it('should create a new customer', async () => {
    const data = { name: 'Jane Doe', email: 'jane@example.com' };
    const customer = await service.createCustomer(data);
    expect(customer).toEqual({ id: '1', ...data });
    expect(prismaService.customer.create).toHaveBeenCalledWith({ data });
  });
});
