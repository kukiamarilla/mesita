import { DetalleConsumicion } from '../models/detalleConsumicion';
import { Controller } from './controller';
import { Router, Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../../data-source';

class DetalleConsumicionController implements Controller {
  path = '/detalle-consumiciones';
  router = Router();
  repository = AppDataSource.getRepository(DetalleConsumicion);

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.post(this.path, this.store);
  }

  public store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const detalleConsumicion = await DetalleConsumicion.crear(req.body);
      return res.json(detalleConsumicion);
    } catch (error) {
      next(error);
    }
  };
}

export { DetalleConsumicionController };
