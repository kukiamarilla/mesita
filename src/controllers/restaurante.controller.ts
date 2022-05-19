import { Request, Response, NextFunction } from 'express';
import { Controller } from './controller';
import * as express from 'express';
import { Restaurante } from '../models/restaurante';
import { AppDataSource } from '../../data-source';
import { RestauranteNotFoundException } from '../exceptions/RestauranteNotFoundException';

class RestauranteController implements Controller {
  path = '/restaurantes';
  router: express.Router = express.Router();
  repository = AppDataSource.getRepository(Restaurante);

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.get(this.path, this.index);
    this.router.get(`${this.path}/:id`, this.show);
    this.router.post(this.path, this.store);
    this.router.put(`${this.path}/:id`, this.update);
    this.router.delete(`${this.path}/:id`, this.delete);
  }

  public index = async (req: Request, res: Response) => {
    const restaurantes = await this.repository.find();
    return res.json(restaurantes);
  };

  public show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const restaurante = await this.repository.findOneBy({ id });
      if (!restaurante) {
        throw new RestauranteNotFoundException(id);
      }
      return res.json(restaurante);
    } catch (error) {
      next(error);
    }
  };

  public store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const restaurante = await this.repository.save(req.body);
      return res.json(restaurante);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = (({ id, ...body }) => body)(req.body);
      const id = parseInt(req.params.id, 10);
      const restaurante = await this.repository.findOneBy({ id });
      if (!restaurante) {
        return next(new RestauranteNotFoundException(id));
      }
      return res.json(await restaurante.actualizar(body));
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const restaurante = await this.repository.findOneBy({ id });
      if (!restaurante) {
        throw new RestauranteNotFoundException(id);
      }
      await restaurante.eliminar();
      return res.json({ message: 'Restaurante eliminado' });
    } catch (error) {
      next(error);
    }
  };
}

export { RestauranteController };
