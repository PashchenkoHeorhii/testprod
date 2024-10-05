import { Exclude } from 'class-transformer';
import { DatabaseConfig } from 'src/database/config/database-config.type';
import databaseConfig from 'src/database/config/database.config';
import { IUser } from '../interfaces/user.interface';
import { ApiProperty } from '@nestjs/swagger';

const idType = (databaseConfig() as DatabaseConfig).isDocumentDatabase
  ? String
  : Number;

export class User implements IUser {
  @ApiProperty({
    type: String,
    example: 'John',
  })
  firstName: string;

  @ApiProperty({
    type: String,
    example: 'Doe',
  })
  lastName: string;

  @ApiProperty({
    type: Number,
    example: 30,
  })
  age: number;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  isStudent: boolean;

  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @Exclude({ toPlainOnly: true })
  @ApiProperty({
    type: String,
    required: false,
    description: 'Password should not be exposed in API responses',
  })
  password?: string;

  @ApiProperty({
    type: Date,
    example: '2024-10-05T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    example: '2024-10-05T00:00:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({
    type: Date,
    example: '2024-10-05T00:00:00.000Z',
    required: false,
  })
  deletedAt: Date;
}
