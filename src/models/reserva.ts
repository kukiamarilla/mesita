import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Restaurante } from './restaurante';
import { Mesa } from './mesa';
import { Horario } from './horario';

@Entity()
export class Reserva {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Restaurante, (restaurante) => restaurante.reservas)
  restaurante!: number;

  @ManyToOne(() => Mesa, (mesa) => mesa.reservas)
  mesa!: Mesa;

  @Column()
  fecha!: Date;

  @ManyToOne(() => Horario, (horario) => horario.reservas)
  horario!: number;
}
