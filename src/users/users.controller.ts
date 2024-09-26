import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSignUpDto } from './dto/user-sign-up.dto';
import { IUser } from './interfaces/user.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get('list')
  listUsers(): IUser[] {
    return [
      {
        age: 10,
        name: 'John',
        dog: true,
      },
      {
        age: 11,
        name: 'Smith',
        dog: true,
      },
    ];
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): any {}

  //GET 'localhost:3000/users?id=1
  // hint for dto is in query
  @Get()
  listUsersWithPe(@Query() query: { id: string }): any {
    return query;
  }

  @Post()
  signUp(@Body() dto: UserSignUpDto): string {
    return this.userService.signUp(dto);
  }

  @Patch()
  updateUserPartially(@Body() body: any): any {}

  @Put()
  updateUser(@Body() body: any): any {}
}

// 'localhost:3000/users'

// CRUD - Create Read Update Delete

// POST GET PUT PATCH DELETE
