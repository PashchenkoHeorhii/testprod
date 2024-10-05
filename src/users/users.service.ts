import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entity/user.entity';
import { NullableType } from '@utils/types/nullable.type';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository) {}

  async create(
    dto: Omit<User, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<User> {
    return this.usersRepository.create(dto);
  }

  async findById(id: User['id']): Promise<NullableType<User>> {
    return this.usersRepository.findById(id);
  }
}
