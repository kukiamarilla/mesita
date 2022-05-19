import { Request, Response } from 'express';
import { Controller } from './controller';
import * as express from 'express';
import { Restaurante } from '../models/restaurante';
import { AppDataSource } from '../../data-source';

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

  public show = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const restaurante = await this.repository.findOneBy({ id });
    return res.json(restaurante);
  };

  public store = async (req: Request, res: Response) => {
    const restaurante = await this.repository.save(req.body);
    return res.json(restaurante);
  };

  public update = async (req: Request, res: Response) => {
    const { id, ...body } = req.body;
    const restauranteId = parseInt(req.params.id, 10);
    await this.repository.update(
      {
        id: restauranteId,
      },
      body
    );
    const restaurante = await this.repository.findOneBy({
      id: restauranteId,
    });
    return res.json(restaurante);
  };

  public delete = async (req: Request, res: Response) => {
    await AppDataSource.manager.delete(Restaurante, {
      id: parseInt(req.params.id, 10),
    });
    return res.json({ message: 'Restaurante eliminado' });
  };
}

export { RestauranteController };
