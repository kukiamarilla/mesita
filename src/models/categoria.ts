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
export class Categoria {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  public static async crear(body: any): Promise<Categoria> {
    body = (({ id, ...body }) => body)(body);
    const categoriaRepository = AppDataSource.getRepository(Categoria);
    return categoriaRepository.save(body);
  }

  public async actualizar(body: any): Promise<Categoria> {
    body = (({ id, ...body }) => body)(body);
    Object.assign(this, body);
    const categoriaRepository = AppDataSource.getRepository(Categoria);
    return categoriaRepository.save(this);
  }

  public async eliminar(): Promise<void> {
    const categoriaRepository = AppDataSource.getRepository(Categoria);
    await categoriaRepository.delete(this.id);
  }

  public static async existe(id: number): Promise<boolean> {
    const categoriaRepository = AppDataSource.getRepository(Categoria);
    const categoria = await categoriaRepository.findOneBy({ id });
    return !!categoria;
  }
}
