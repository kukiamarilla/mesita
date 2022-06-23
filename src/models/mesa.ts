import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Restaurante } from './restaurante';
import { AppDataSource } from '../../data-source';
import { RestauranteNotFoundException } from '../exceptions/RestauranteNotFoundException';
import { Reserva } from './reserva';
import { Consumicion } from './consumicion';

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
  @JoinTable()
  restaurante!: Promise<Restaurante>;

  @OneToMany(() => Reserva, (reserva) => reserva.mesa)
  reservas!: Reserva[];

  @OneToMany(() => Consumicion, (consumicion) => consumicion.mesa)
  consumiciones!: Consumicion[];

  public static async crear(body: any): Promise<Mesa> {
    body = (({ id, ...body }) => body)(body);
    const mesaRepository = AppDataSource.getRepository(Mesa);
    const restauranteRepository = AppDataSource.getRepository(Restaurante);
    const restaurante = await restauranteRepository.findOneBy({
      id: body.restaurante,
    });
    if (!restaurante) {
      throw new RestauranteNotFoundException(body.restaurante);
    }
    return await mesaRepository.save(body);
  }

  public async actualizar(body: any): Promise<Mesa> {
    body = (({ id, ...body }) => body)(body);
    const restauranteRepository = AppDataSource.getRepository(Restaurante);
    const restaurante = await restauranteRepository.findOneBy({
      id: body.restaurante,
    });
    if (!restaurante) {
      throw new RestauranteNotFoundException(body.restaurante);
    }
    const mesaRepository = AppDataSource.getRepository(Mesa);
    const mesa = await mesaRepository.findOneBy({ id: this.id });
    Object.assign(mesa, body);
    return await mesaRepository.save(mesa);
  }

  public eliminar(): void {
    const mesaRepository = AppDataSource.getRepository(Mesa);
    mesaRepository.delete(this.id);
  }

  public static async existe(id: number): Promise<boolean> {
    const mesaRepository = AppDataSource.getRepository(Mesa);
    const mesa = await mesaRepository.findOneBy({ id });
    return !!mesa;
  }

  public async consumicion(): Promise<Consumicion | null> {
    const consumicionRepository = AppDataSource.getRepository(Consumicion);
    const mesa: Mesa = this;
    const consumicion = await consumicionRepository.findOne({
      where: { mesa: { id: mesa.id }, estado: 'abierto' },
    });
    if (!consumicion) return null;
    return consumicion;
  }
}
