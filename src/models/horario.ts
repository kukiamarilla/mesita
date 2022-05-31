import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reserva } from './reserva';
import { AppDataSource } from '../../data-source';

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

  public static async existe(id: number): Promise<boolean> {
    const horarioRepository = AppDataSource.getRepository(Horario);
    const horario = await horarioRepository.findOneBy({ id });
    return !!horario;
  }
}
