// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userDto: any): Promise<User> {
    const createdUser = new this.userModel(userDto);
    return createdUser.save();
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  async addFavorite(email: string, movieId: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user.favorites.includes(movieId)) {
      user.favorites.push(movieId);
    }
    return user.save();
  }

  async getFavorites(email: string): Promise<{ favorites: string[] }> {
    const user = await this.userModel.findOne({ email }).exec();
    return { favorites: user.favorites };
  }
}
