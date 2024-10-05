import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindOptionsWhere, Repository, In } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { NullableType } from '@utils/types/nullable.type';
import { IPaginationOptions } from '@utils/types/pagination-options';
import { SortUserDto } from 'src/users/dto/sort-user.dto';
import { User } from 'src/users/entity/user.entity';
import { UserRepository } from 'src/users/user.repository';
import { DeepPartial } from '@utils/types/deep-partial.type';

@Injectable()
export class UsersRelationalRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(data: User): Promise<User> {
    return data as User;
  }

  async findManyWithPagination({
    sortOptions,
    paginationOptions,
  }: {
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<User[]> {
    const where: FindOptionsWhere<UserEntity> = {};

    const entities = await this.usersRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });

    return entities as unknown as User[];
  }

  async findById(id: User['id']): Promise<NullableType<User>> {
    return (await this.usersRepository.findOne({
      where: { id: Number(id) },
    })) as unknown as User;
  }

  async findByIds(ids: User['id'][]): Promise<User[]> {
    return (await this.usersRepository.find({
      where: { id: In(ids) },
    })) as unknown as User[];
  }

  async update(id: User['id'], payload: Partial<User>): Promise<User> {
    const entity = await this.usersRepository.findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      throw new Error('User not found');
    }

    return (await this.usersRepository.save(
      payload as DeepPartial<UserEntity>,
    )) as unknown as User;
  }

  async remove(id: User['id']): Promise<void> {
    await this.usersRepository.softDelete(id);
  }
}
