import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GenerateVoucherDto } from './dto/generate-voucher.dto';
import { RedeemVoucherDto } from './dto/redeem-voucher.dto';
import { CustomerVoucherDto } from './dto/customer-voucher.dto';
import { VoucherEntity } from './voucher.entity';
import { VoucherCode } from '@prisma/client';
@ApiTags('vouchers')
@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Post('generate')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Generate a voucher' })
  @ApiResponse({
    status: 201,
    description: 'The voucher has been successfully generated.',
    type: VoucherEntity,
  })
  async generateVoucher(
    @Body() generateVoucherDto: GenerateVoucherDto,
  ): Promise<VoucherCode> {
    const { customerId, offerId, expirationDate } = generateVoucherDto;
    return this.voucherService.generateVoucher(
      customerId,
      offerId,
      expirationDate,
    );
  }

  @Post('redeem')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Redeem a voucher' })
  @ApiResponse({
    status: 200,
    description: 'Voucher has been redeemed successfully.',
    type: VoucherEntity,
  })
  @ApiResponse({ status: 400, description: 'Invalid or expired voucher.' })
  async redeemVoucher(
    @Body() redeemVoucherDto: RedeemVoucherDto,
  ): Promise<VoucherCode> {
    const { code, email } = redeemVoucherDto;
    return this.voucherService.redeemVoucher(code, email);
  }

  @Get('customer/:email')
  @ApiOperation({ summary: 'Get vouchers for a customer' })
  @ApiResponse({
    status: 200,
    description: 'Returns customer vouchers.',
    type: [CustomerVoucherDto],
  })
  async getCustomerVouchers(
    @Param('email') email: string,
  ): Promise<VoucherCode[]> {
    return this.voucherService.getCustomerVouchers(email);
  }
}
