import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';

@Entity('attributes')
export class Attribute {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'color' })
  @Column()
  name: string;

  @ApiProperty({ type: [String], example: ['red', 'blue'] })
  @Column('simple-json')
  values: string[];

  @ManyToOne(() => User, user => user.attributes, { onDelete: 'CASCADE' })
  user: User;
}