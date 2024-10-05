import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserRepository } from '../../../user.repository';
import { UserModel } from '../entities/user.schema';
import { FilterQuery, Model } from 'mongoose';
import { IPaginationOptions } from '@utils/types/pagination-options';
import { SortUserDto } from '../../../dto/sort-user.dto';
import { User } from '../../../entity/user.entity';

@Injectable()
export class UsersDocumentRepository implements UserRepository {
  constructor(
    @InjectModel(UserModel.name)
    private readonly usersModel: Model<UserModel>,
  ) {}

  async create(data: User): Promise<User> {
    const createdUser = new this.usersModel(data);
    return (await createdUser.save()) as unknown as User;
  }

  async findManyWithPagination({
    sortOptions,
    paginationOptions,
  }: {
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<User[]> {
    const where: FilterQuery<UserModel> = {};

    const userObjects = await this.usersModel
      .find(where)
      .sort(
        sortOptions?.reduce(
          (accumulator, sort) => ({
            ...accumulator,
            [sort.orderBy === 'id' ? '_id' : sort.orderBy]:
              sort.order.toUpperCase() === 'ASC' ? 1 : -1,
          }),
          {},
        ),
      )
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return userObjects as unknown as User[];
  }

  async findById(id: User['id']): Promise<User> {
    const userObject = await this.usersModel.findById(id);
    return userObject as unknown as User;
  }

  async findByIds(ids: User['id'][]): Promise<User[]> {
    return await this.usersModel.find({ _id: { $in: ids } });
  }

  async update(id: User['id'], payload: Partial<User>): Promise<User | null> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const user = await this.usersModel.findOne(filter);

    if (!user) {
      return null;
    }

    const userObject = await this.usersModel.findOneAndUpdate(
      filter,
      clonedPayload,
      { new: true },
    );

    return userObject as unknown as User;
  }

  async remove(id: User['id']): Promise<void> {
    await this.usersModel.deleteOne({
      _id: id.toString(),
    });
  }
}
