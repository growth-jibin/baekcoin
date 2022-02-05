import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class user {
  @PrimaryColumn()
  id: string;
  @Column()
  pw: string;
  @Column()
  mail: string;

  //보유 코인
  @Column({ default: 0 })
  Abd: number;
  @Column({ default: 0 })
  Splendorous: number;
  @Column({ default: 0 })
  Karamat: number;
  @Column({ default: 0 })
  Hamza: number;
  @Column({ default: 0 })
  Aeneas: number;
  @Column({ default: 0 })
  Tor: number;
  @Column({ default: 0 })
  Ivar: number;
  @Column({ default: 0 })
  Beorn: number;
  @Column({ default: 0 })
  Indivar: number;
  @Column({ default: 0 })
  Jek: number;
  @Column({ default: 0 })
  Mann: number;
  @Column({ default: 0 })
  Isiah: number;
  @Column({ default: 0 })
  Valdus: number;
  @Column({ default: 0 })
  Lorcan: number;
  @Column({ default: 0 })
  Cadman: number;
  //돈
  @Column({ default: 0 })
  money: number;
}
