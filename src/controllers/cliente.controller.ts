import { Controller } from './controller';
import { Router, Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../../data-source';
import { Cliente } from '../models/cliente';
import { ClienteNotFoundException } from '../exceptions/ClienteNotFoundException';

class ClienteController implements Controller {
  path = '/clientes';
  router = Router();
  repository = AppDataSource.getRepository(Cliente);

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.get(this.path, this.index);
    this.router.get(`${this.path}/:id`, this.show);
    this.router.post(this.path, this.store);
  }

  public index = async (req: Request, res: Response) => {
    const clientes = await this.repository.find();
    return res.json(clientes);
  };

  public show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const cliente = await this.repository.findOneBy({ id });
      if (!cliente) {
        throw new ClienteNotFoundException(id);
      }
      return res.json(cliente);
    } catch (error) {
      next(error);
    }
  };

  public store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cliente = await Cliente.crear(req.body);
      return res.json(cliente);
    } catch (error) {
      next(error);
    }
  };
}

export { ClienteController };
