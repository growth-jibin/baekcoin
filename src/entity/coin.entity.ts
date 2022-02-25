import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class coin {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  company: string;
  @Column()
  price: number;
  @Column()
  last_price: number;
  @Column()
  sales_rate: number;
}
