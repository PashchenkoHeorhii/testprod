import { IsString, IsOptional, IsInt, IsBoolean } from 'class-validator';
import { IUpdateUserPartialInput } from '../interfaces/update-user-partial-input.interface';

export class UpdateUserPartialInputDto implements IUpdateUserPartialInput {
  @IsString()
  @IsOptional()
  firstName: string | null;

  @IsString()
  @IsOptional()
  lastName: string | null;

  @IsInt()
  @IsOptional()
  age: number | null;

  @IsBoolean()
  @IsOptional()
  isStudent: boolean | null;
}
