import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinTable,
  } from 'typeorm';
  import { Categoria } from './categoria';
  import { Restaurante } from './restaurante';
  import { AppDataSource } from '../../data-source';
  import { CategoriaNotFoundException } from '../exceptions/CategoriaNotFoundException';
  import { Reserva } from './reserva';
  
  @Entity()
  export class Producto {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    nombre!: string;
  
    @ManyToOne(() => Categoria, (categoria) => categoria.producto)
    @JoinTable()
    categoria!: Promise<Categoria>;
  
    public static async crear(body: any): Promise<Producto> {
      body = (({ id, ...body }) => body)(body);
      const productoRepository = AppDataSource.getRepository(Producto);
      const categoriaRepository = AppDataSource.getRepository(Categoria);
      const categoria = await categoriaRepository.findOneBy({
        id: body.categoria,
      });
      if (!categoria) {
        throw new CategoriaNotFoundException(body.categoria);
      }
      return await productoRepository.save(body);
    }
  
    public async actualizar(body: any): Promise<Producto> {
      body = (({ id, ...body }) => body)(body);
      const categoriaRepository = AppDataSource.getRepository(Categoria);
      const categoria = await categoriaRepository.findOneBy({
        id: body.categoria,
      });
      if (!categoria) {
        throw new CategoriaNotFoundException(body.categoria);
      }
      const productoRepository = AppDataSource.getRepository(Producto);
      const producto = await productoRepository.findOneBy({ id: this.id });
      Object.assign(producto, body);
      return await productoRepository.save(producto);
    }
  
    public eliminar(): void {
      const productoRepository = AppDataSource.getRepository(Producto);
      productoRepository.delete(this.id);
    }
  
    public static async existe(id: number): Promise<boolean> {
      const productoRepository = AppDataSource.getRepository(Producto);
      const mesa = await productoRepository.findOneBy({ id });
      return !!mesa;
    }
  }
  