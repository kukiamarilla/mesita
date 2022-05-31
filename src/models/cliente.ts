import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Reserva } from './reserva';

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

  @OneToMany(() => Reserva, (reserva) => reserva.cliente)
  reservas!: Reserva[];

  public static async crear(body: any): Promise<Cliente> {
    body = (({ id, ...body }) => body)(body);
    const clienteRepository = AppDataSource.getRepository(Cliente);
    return await clienteRepository.save(body);
  }

  public static async existe(id: number): Promise<boolean> {
    const clienteRepository = AppDataSource.getRepository(Cliente);
    const cliente = await clienteRepository.findOneBy({ id });
    return !!cliente;
  }
}
