import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllCustomers() {
    return this.prismaService.customer.findMany();
  }

  async createCustomer(data: { name: string; email: string }) {
    return this.prismaService.customer.create({ data });
  }
  async checkCustomerExists(customerId: string) {
    const customer = await this.prismaService.customer.findUnique({
      where: { id: customerId },
    });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${customerId} not found`);
    }
    return customer;
  }
}
