import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('skus')
export class SKU {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'A1' })
  @Column()
  model: string;

  @ApiProperty({ example: '100' })
  @Column()
  price: string;

  @ApiProperty({ example: '50' })
  @Column()
  numberInStock: string;
}
