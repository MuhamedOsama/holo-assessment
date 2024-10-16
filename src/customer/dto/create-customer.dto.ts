import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsEmail } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the customer' })
  @IsString()
  @Length(2, 50)
  name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'The email of the customer',
  })
  @IsEmail()
  email: string;
}
