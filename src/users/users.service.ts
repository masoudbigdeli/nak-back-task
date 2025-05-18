import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) { }

  async create(dto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const exists = await this.usersRepo.findOneBy({ userName: dto.userName });
    if (exists) throw new ConflictException('Username already taken');
    const hash = await bcrypt.hash(dto.password, 12);
    const user = this.usersRepo.create({ ...dto, password: hash });
    await this.usersRepo.save(user);
    const { password, ...result } = user;
    return result;
  }

  async findByUserName(userName: string): Promise<User | null> {
    return this.usersRepo.findOneBy({ userName });
  }

  /** List all users (excluding passwords) */
  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.usersRepo.find();
    return users.map(({ password, ...u }) => u);
  }

  /** Get a single user by ID (throws if not found) */
  async findOne(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepo.findOneOrFail({ where: { id } });
    const { password, ...u } = user;
    return u;
  }

  
}