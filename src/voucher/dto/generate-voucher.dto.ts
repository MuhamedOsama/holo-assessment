import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsISO8601,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

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
  expirationDate: Date;
}
