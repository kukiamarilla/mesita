import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AppDataSource } from '../../data-source';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { unique: true })
  cedula: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  public static async crear(body: any): Promise<Cliente> {
    body = (({ id, ...body }) => body)(body);
    const clienteRepository = AppDataSource.getRepository(Cliente);
    return await clienteRepository.save(body);
  }
}
