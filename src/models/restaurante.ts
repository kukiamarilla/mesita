import 'reflect-metadata';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Mesa } from './mesa';
import { AppDataSource } from '../../data-source';
import { Reserva } from './reserva';

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

  @OneToMany(() => Reserva, (reserva) => reserva.restaurante)
  reservas!: Reserva[];

  public static async crear(body: any): Promise<Restaurante> {
    body = (({ id, ...body }) => body)(body);
    const restauranteRepository = AppDataSource.getRepository(Restaurante);
    return restauranteRepository.save(body);
  }

  public async actualizar(body: any): Promise<Restaurante> {
    body = (({ id, ...body }) => body)(body);
    Object.assign(this, body);
    const restauranteRepository = AppDataSource.getRepository(Restaurante);
    return restauranteRepository.save(this);
  }

  public async eliminar(): Promise<void> {
    const restauranteRepository = AppDataSource.getRepository(Restaurante);
    await this.mesas.forEach(async (mesa) => await mesa.eliminar());
    await restauranteRepository.delete(this.id);
  }

  public static async existe(id: number): Promise<boolean> {
    const restauranteRepository = AppDataSource.getRepository(Restaurante);
    const restaurante = await restauranteRepository.findOneBy({ id });
    return !!restaurante;
  }
}
