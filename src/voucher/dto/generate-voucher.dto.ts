import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsISO8601,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { IsFutureDate } from '../../validators/IsFutureDate.validator';
import { Type } from 'class-transformer';

export class GenerateVoucherDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  customerId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  offerId: string;
  @ApiProperty()
  @IsISO8601()
  @IsFutureDate({ message: 'Expiration date must be a future date' })
  expirationDate: Date;
}
