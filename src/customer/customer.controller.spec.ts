import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

describe('CustomerController', () => {
  let controller: CustomerController;
  let service: CustomerService;

  const mockCustomerService = {
    getAllCustomers: jest.fn(() => [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
    ]),
    createCustomer: jest.fn((dto) => ({
      id: '1',
      ...dto,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        {
          provide: CustomerService,
          useValue: mockCustomerService,
        },
      ],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all customers', async () => {
    const customers = await controller.getCustomers();
    expect(customers).toEqual([
      { id: '1', name: 'John Doe', email: 'john@example.com' },
    ]);
    expect(service.getAllCustomers).toHaveBeenCalled();
  });

  it('should create a new customer', async () => {
    const dto = { name: 'Jane Doe', email: 'jane@example.com' };
    const customer = await controller.createCustomer(dto);
    expect(customer).toEqual({ id: '1', ...dto });
    expect(service.createCustomer).toHaveBeenCalledWith(dto);
  });
});
