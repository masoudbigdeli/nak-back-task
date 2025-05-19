import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) { }

  async create(dto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const created = new this.userModel(dto);
    const user = await created.save();
    const { password, ...u } = user.toObject();
    return u;
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    // tell mongoose to exclude the password field
    const users = await this.userModel
      .find()
      .select('-password')
      .exec();

    // now each u.toObject() has no `password` key at all:
    return users.map(u => u.toObject() as Omit<User, 'password'>);
  }

  async findOne(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('User not found');
    const { password, ...u } = user.toObject();
    return u;
  }

  async findByUsername(userName: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ userName }).exec();
  }
}
