import { IsEmail, IsNotEmpty, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';

class Address {
  @IsNotEmpty()
  addr1: string;

  @IsNotEmpty()
  addr2: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  zip: string;
}

export class UpdateMailchimpDto {
  @IsNotEmpty()
  listId: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @ValidateNested()
  @Type(() => Address)
  @Transform(({ value }) => JSON.parse(value))
  address: Address;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  birthday: string;
}
