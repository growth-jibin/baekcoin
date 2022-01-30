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
  @Column()
  Abd: number;
  @Column()
  Splendorous: number;
  @Column()
  Karamat: number;
  @Column()
  Hamza: number;
  @Column()
  Aeneas: number;
  @Column()
  Tor: number;
  @Column()
  Ivar: number;
  @Column()
  Beorn: number;
  @Column()
  Indivar: number;
  @Column()
  Jek: number;
  @Column()
  Mann: number;
  @Column()
  Isiah: number;
  @Column()
  Valdus: number;
  @Column()
  Lorcan: number;
  @Column()
  Cadman: number;
}
