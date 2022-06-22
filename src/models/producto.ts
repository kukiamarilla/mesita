import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Categoria } from './categoria';
import { AppDataSource } from '../../data-source';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  precio!: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  categoria!: Categoria;

  public static async crear(body: any): Promise<Producto> {
    body = (({ id, ...body }) => body)(body);
    const productoRepository = AppDataSource.getRepository(Producto);
    return productoRepository.save(body);
  }

  public async actualizar(body: any): Promise<Producto> {
    body = (({ id, ...body }) => body)(body);
    Object.assign(this, body);
    const productoRepository = AppDataSource.getRepository(Producto);
    return productoRepository.save(this);
  }

  public async eliminar(): Promise<void> {
    const productoRepository = AppDataSource.getRepository(Producto);
    await productoRepository.delete(this.id);
  }

  public static async existe(id: number): Promise<boolean> {
    const productoRepository = AppDataSource.getRepository(Producto);
    const producto = await productoRepository.findOneBy({ id });
    return !!producto;
  }
}
