import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../users/user.entity';
import { SKU } from '../skus/sku.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, user => user.products, { onDelete: 'CASCADE' })
  user: User;

  @ManyToMany(() => SKU)
  @JoinTable()
  skus: SKU[];

  @Column('jsonb')
  attributes: { name: string; values: string[] }[];
}
