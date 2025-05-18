import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Attribute } from './attribute.entity'
import { CreateAttributeDto } from './dto/create-attribute.dto'
import { User } from '../users/user.entity' 

@Injectable()
export class AttributesService {
  constructor(
    @InjectRepository(Attribute)
    private readonly attrRepo: Repository<Attribute>,
  ) {}

  async create(userId: string, dto: CreateAttributeDto): Promise<Attribute> {
    const attr = this.attrRepo.create({ ...dto, user: { id: userId } as User })
    return this.attrRepo.save(attr)
  }
}