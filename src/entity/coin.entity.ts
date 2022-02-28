import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class coin {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  company: string;
  @Column({ default: 0 })
  price: number;
  @Column({ default: 0 })
  last_price: number;
  @Column({ default: 0 })
  sales_rate: number;
}
