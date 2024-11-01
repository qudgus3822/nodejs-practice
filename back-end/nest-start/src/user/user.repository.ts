import { Injectable } from '@nestjs/common';
import { UserDto } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

export interface UserRepository {
  getAllUser(): Promise<UserDto[]>;
  createUser(userDto: UserDto);
  getUser(id: string): Promise<UserDto>;
  deleteUser(id: string);
  updateUser(id: string, userDto: UserDto);
}

@Injectable()
export class UserMongoRepository implements UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAllUser(): Promise<UserDto[]> {
    return await this.userModel.find().exec();
  }

  async createUser(userDto: UserDto) {
    const createUser = {
      ...userDto,
      createdDt: new Date(),
      updatedDt: new Date(),
    };
    this.userModel.create(createUser);
  }

  async getUser(id: string): Promise<UserDto> {
    return await this.userModel.findById(id);
  }

  async deleteUser(id: string) {
    await this.userModel.findByIdAndDelete(id);
  }

  async updateUser(id: string, userDto: UserDto) {
    const updateUser = { id, ...userDto, updatedDt: new Date() };
    await this.userModel.findByIdAndUpdate(id, updateUser);
  }
}
