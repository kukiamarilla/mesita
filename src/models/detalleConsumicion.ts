import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { Producto } from './producto';
import { AppDataSource } from '../../data-source';
import { ProductoNotFoundException } from '../exceptions/ProductoNotFoundException';
import { Consumicion } from './consumicion';
import { ConsumicionNotFoundException } from '../exceptions/ConsumicionNotFoundException';
import { ConsumicionClosedException } from '../exceptions/ConsumicionClosedException';

@Entity()
export class DetalleConsumicion {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  cantidad!: number;

  @ManyToOne(() => Producto, (producto) => producto.detalleConsumiciones, {
    eager: true,
  })
  @JoinColumn()
  producto!: Producto;

  @ManyToOne(
    () => Consumicion,
    (consumicion) => consumicion.detalleConsumiciones
  )
  consumicion!: Consumicion;

  public static async crear(body: any): Promise<DetalleConsumicion> {
    body = (({ id, ...body }) => body)(body);

    if (!(await Producto.existe(body.producto)))
      throw new ProductoNotFoundException(body.producto);
    if (!(await Consumicion.existe(body.consumicion)))
      throw new ConsumicionNotFoundException(body.consumicion);
    if (await Consumicion.estaCerrado(body.consumicion))
      throw new ConsumicionClosedException(body.consumicion);

    const detalleConsumicionRepository =
      AppDataSource.getRepository(DetalleConsumicion);
    return detalleConsumicionRepository.save(body);
  }
}
