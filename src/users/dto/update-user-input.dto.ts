import { IsBoolean, IsInt, IsString } from 'class-validator';
import { IUpdateUserInput } from '../interfaces/update-user-input.interface';

export class UpdateUserInputDto implements IUpdateUserInput {
  @IsString()
  firstName: string | null;

  @IsString()
  lastName: string | null;

  @IsInt()
  age: number | null;

  @IsBoolean()
  isStudent: boolean | null;
}
