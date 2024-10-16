import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RedeemVoucherDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(8, 8)
  code: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
