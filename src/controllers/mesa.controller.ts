import { Router, Request, Response, NextFunction } from 'express';
import { Controller } from './controller';
import { AppDataSource } from '../../data-source';
import { Mesa } from '../models/mesa';
import { Restaurante } from '../models/restaurante';
import { nextTick } from 'process';
import { MesaNotFoundException } from '../exceptions/MesaNotFoundException';
import { RestauranteNotFoundException } from '../exceptions/RestauranteNotFoundException';

class MesaController implements Controller {
  path = '/mesas';
  router = Router();
  repository = AppDataSource.getRepository(Mesa);
  restauranteRepository = AppDataSource.getRepository(Restaurante);

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.get(`${this.path}/:id`, this.show);
    this.router.post(this.path, this.store);
    this.router.put(`${this.path}/:id`, this.update);
    this.router.delete(`${this.path}/:id`, this.delete);
  }

  public show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const mesa = await this.repository.findOneBy({ id });
      if (!mesa) {
        throw new MesaNotFoundException(id);
      }
      return res.json(mesa);
    } catch (error) {
      next(error);
    }
  };

  public store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const mesa = await Mesa.crear(body);
      return res.json(mesa);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const id = parseInt(req.params.id, 10);
      const mesa = await this.repository.findOneBy({ id });
      if (!mesa) {
        throw new MesaNotFoundException(id);
      }
      return res.json(await mesa.actualizar(body));
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const mesa = await this.repository.findOneBy({ id });
      if (!mesa) {
        throw new MesaNotFoundException(id);
      }
      mesa.eliminar();
      return res.json({ message: 'Mesa eliminada' });
    } catch (error) {
      next(error);
    }
  };
}

export { MesaController };
