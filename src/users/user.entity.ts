import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Attribute } from '../attributes/attribute.entity';
import { Product } from '../products/product.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  userName: string;

  @Column()
  password: string;

  @OneToMany(() => Attribute, attr => attr.user)
  attributes: Attribute[];

  @OneToMany(() => Product, prod => prod.user)
  products: Product[];
}