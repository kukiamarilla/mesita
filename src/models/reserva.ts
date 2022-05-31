import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { Restaurante } from './restaurante';
import { Mesa } from './mesa';
import { Horario } from './horario';
import { Cliente } from './cliente';
import { AppDataSource } from '../../data-source';
import { RestauranteNotFoundException } from '../exceptions/RestauranteNotFoundException';
import { MesaNotFoundException } from '../exceptions/MesaNotFoundException';
import { HorarioNotFoundException } from '../exceptions/HorarioNotFoundException';
import { ClienteNotFoundException } from '../exceptions/ClienteNotFoundException';
import { DataMismatchException } from '../exceptions/DataMismatchExection';

@Entity()
export class Reserva {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Restaurante, (restaurante) => restaurante.reservas, {
    eager: true,
  })
  @JoinTable()
  restaurante!: Reserva;

  @ManyToOne(() => Mesa, (mesa) => mesa.reservas, { eager: true })
  mesa!: Mesa;

  @Column()
  fecha!: Date;

  @ManyToOne(() => Horario, (horario) => horario.reservas, { eager: true })
  horario!: Horario;

  @ManyToOne(() => Cliente, (cliente) => cliente.reservas, { eager: true })
  cliente!: Cliente;

  public static async crear(body: any): Promise<Reserva> {
    body = (({ id, ...body }) => body)(body);

    if (!(await Restaurante.existe(body.restaurante)))
      throw new RestauranteNotFoundException(body.restaurante);

    if (!(await Mesa.existe(body.mesa)))
      throw new MesaNotFoundException(body.mesa);

    if (!(await Horario.existe(body.horario)))
      throw new HorarioNotFoundException(body.horario);

    if (!(await Cliente.existe(body.cliente)))
      throw new ClienteNotFoundException(body.cliente);

    const mesaRepository = AppDataSource.getRepository(Mesa);
    const mesa = await mesaRepository.findOneBy({ id: body.mesa });
    const restaurante = await mesa.restaurante;
    if (restaurante.id !== body.restaurante)
      throw new DataMismatchException(
        'La mesa no pertenece al restaurante indicado.'
      );

    const reservaRepository = AppDataSource.getRepository(Reserva);
    return await reservaRepository.save(body);
  }

  public static async existe(id: number): Promise<boolean> {
    const reservaRepository = AppDataSource.getRepository(Reserva);
    const reserva = await reservaRepository.findOneBy({ id });
    return !!reserva;
  }
}
