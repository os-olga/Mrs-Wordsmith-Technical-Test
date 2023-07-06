import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { Unique } from 'typeorm';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty({ message: 'Please enter name' })
  @MaxLength(30)
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Please enter address' })
  @MaxLength(100)
  @MinLength(3)
  address: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Please enter email' })
  @MaxLength(60)
  @Validate(Unique, ['email'])
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Please enter phone' })
  phone: string;
}
