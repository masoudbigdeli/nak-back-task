import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SKU {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  model: string;

  @Column()
  price: string;

  @Column()
  numberInStock: string;
}