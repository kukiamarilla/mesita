import { Consumicion } from '../models/consumicion';
import { Controller } from './controller';
import { Router, Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../../data-source';
import { ConsumicionNotFoundException } from '../exceptions/ConsumicionNotFoundException';

class ConsumicionController implements Controller {
  path = '/consumiciones';
  router = Router();
  repository = AppDataSource.getRepository(Consumicion);

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.get(`${this.path}/:id`, this.show);
    this.router.post(this.path, this.store);
    this.router.put(`${this.path}/:id`, this.update);
    this.router.post(`${this.path}/:id/cerrar`, this.cerrar);
  }

  public show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const consumicion = await this.repository.findOneBy({ id });
      if (!consumicion) throw new ConsumicionNotFoundException(id);
      return res.json(consumicion);
    } catch (error) {
      next(error);
    }
  };

  public store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const consumicion = await Consumicion.crear(req.body);
      return res.json(consumicion);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const id = parseInt(req.params.id, 10);
      const consumicion = await this.repository.findOneBy({ id });
      if (!consumicion) throw new ConsumicionNotFoundException(id);
      const cliente = body.cliente;
      return res.json(await consumicion.setCliente(cliente));
    } catch (error) {
      next(error);
    }
  };

  public cerrar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const consumicion = await this.repository.findOneBy({ id });
      if (!consumicion) throw new ConsumicionNotFoundException(id);
      return res.json(await consumicion.cerrar());
    } catch (error) {
      next(error);
    }
  };
}

export { ConsumicionController };
