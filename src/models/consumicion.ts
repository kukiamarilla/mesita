import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { ClienteNotFoundException } from '../exceptions/ClienteNotFoundException';
import { Cliente } from './cliente';
import { Mesa } from './mesa';
import { MesaNotFoundException } from '../exceptions/MesaNotFoundException';
import { AppDataSource } from '../../data-source';
import { OneToMany } from 'typeorm';
import { DetalleConsumicion } from './detalleConsumicion';
import { ConsumicionAlreadyOpenException } from '../exceptions/ConsumicionAlreadyOpenException';

@Entity()
export class Consumicion {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.consumiciones)
  @JoinTable()
  cliente!: Cliente;

  @ManyToOne(() => Mesa, (mesa) => mesa.consumiciones)
  @JoinTable()
  mesa!: Mesa;

  @Column()
  creado!: Date;

  @Column({ nullable: true })
  cerrado?: Date;

  @Column({ nullable: true })
  total?: number;

  @Column()
  estado: 'abierto' | 'cerrado' = 'abierto';

  @OneToMany(
    () => DetalleConsumicion,
    (detalleConsumicion) => detalleConsumicion.consumicion,
    { eager: true }
  )
  @JoinTable()
  detalleConsumiciones!: DetalleConsumicion[];

  public static async crear(body: any): Promise<Consumicion> {
    body = (({ id, creado, cerrado, total, estado, ...body }) => body)(body);
    body.creado = new Date();
    body.estado = 'abierto';

    if (!(await Cliente.existe(body.cliente)))
      throw new ClienteNotFoundException(body.cliente);

    if (!(await Mesa.existe(body.mesa)))
      throw new MesaNotFoundException(body.mesa);

    const mesaRepository = AppDataSource.getRepository(Mesa);
    const mesa = await mesaRepository.findOneBy({ id: body.mesa });
    if (await mesa.consumicion())
      throw new ConsumicionAlreadyOpenException(mesa.id);
    const consumicionRepository = AppDataSource.getRepository(Consumicion);
    return await consumicionRepository.save(body);
  }

  public async setCliente(clienteId: number): Promise<Consumicion> {
    const clienteRepository = AppDataSource.getRepository(Cliente);
    const cliente = await clienteRepository.findOneBy({ id: clienteId });
    if (!cliente) throw new ClienteNotFoundException(clienteId);
    this.cliente = cliente;
    const consumicionRepository = AppDataSource.getRepository(Consumicion);
    return await consumicionRepository.save(this);
  }

  public async cerrar(): Promise<Consumicion> {
    this.cerrado = new Date();
    this.estado = 'cerrado';
    const consumicionRepository = AppDataSource.getRepository(Consumicion);
    const total = this.detalleConsumiciones.reduce((total, detalle) => {
      return total + detalle.producto.precio * detalle.cantidad;
    }, 0);
    this.total = total;
    return await consumicionRepository.save(this);
  }

  public static async estaCerrado(id): Promise<boolean> {
    const consumicionRepository = AppDataSource.getRepository(Consumicion);
    const consumicion = await consumicionRepository.findOneBy({ id });
    return consumicion.estado === 'cerrado';
  }

  public static async existe(id: number): Promise<boolean> {
    const consumicionRepository = AppDataSource.getRepository(Consumicion);
    const consumicion = await consumicionRepository.findOneBy({ id });
    return !!consumicion;
  }
}
