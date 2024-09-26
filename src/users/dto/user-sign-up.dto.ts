import { IsNumber, IsString, Length } from 'class-validator';
import { IUser } from '../interfaces/user.interface';
import { Transform } from 'class-transformer';

export class UserSignUpDto implements IUser {
  @IsString()
  @Length(1, 3)
  dog: true;

  name: string;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value) * 10)
  age: number;

  id: number;
}
