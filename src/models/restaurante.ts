import 'reflect-metadata';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Mesa } from './mesa';

@Entity()
export class Restaurante {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  direccion!: string;

  @OneToMany(() => Mesa, (mesa) => mesa.restaurante, { eager: true })
  @JoinTable()
  mesas!: Mesa[];
}
