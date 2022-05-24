import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reserva } from './reserva';

@Entity()
export class Horario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  horaInicio!: string;

  @Column()
  horaFin!: string;

  @OneToMany(() => Reserva, (reserva) => reserva.horario)
  reservas!: Reserva[];
}
