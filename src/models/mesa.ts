import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Restaurante } from './restaurante';

@Entity()
export class Mesa {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  x!: number;

  @Column()
  y!: number;

  @Column('int', { default: 1 })
  piso: number;

  @Column()
  capacidad: number;

  @ManyToOne(() => Restaurante, (restaurante) => restaurante.mesas)
  restaurante!: Restaurante;
}
