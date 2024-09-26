import { IsNumber, Length } from 'class-validator';
import { IGetUserInput } from '../interfaces/get-user-input.interface';

export class GetUserInput implements IGetUserInput {
  @IsNumber()
  @Length(0, 3)
  id: number;
}
