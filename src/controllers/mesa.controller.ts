import { Router, Request, Response } from 'express';
import { Controller } from './controller';
import { AppDataSource } from '../../data-source';
import { Mesa } from '../models/mesa';
import { Restaurante } from '../models/restaurante';

class MesaController implements Controller {
  path = '/mesas';
  router = Router();
  repository = AppDataSource.getRepository(Mesa);

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.get(`${this.path}/:id`, this.show);
    this.router.post(this.path, this.store);
    this.router.put(`${this.path}/:id`, this.update);
    this.router.delete(`${this.path}/:id`, this.delete);
  }

  public show = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const mesa = await this.repository.findOneBy({ id });
    return res.json(mesa);
  };

  public store = async (req: Request, res: Response) => {
    const mesa = await this.repository.save(req.body);
    const restaurante = await AppDataSource.getRepository(
      Restaurante
    ).findOneBy({ id: mesa.restauranteId });
    this.repository.save(mesa);
    return res.json(mesa);
  };

  public update = async (req: Request, res: Response) => {
    const { id, ...body } = req.body;
    const mesaId = parseInt(req.params.id, 10);
    await this.repository.update(
      {
        id: mesaId,
      },
      body
    );
    const mesa = await this.repository.findOneBy({
      id: mesaId,
    });
    return res.json(mesa);
  };

  public delete = async (req: Request, res: Response) => {
    await this.repository.delete({
      id: parseInt(req.params.id, 10),
    });
    return res.json({ message: 'Mesa eliminada' });
  };
}

export { MesaController };
