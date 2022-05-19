import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Restaurante } from './restaurante';
import { AppDataSource } from '../../data-source';
import { RestauranteNotFoundException } from '../exceptions/RestauranteNotFoundException';

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
}
