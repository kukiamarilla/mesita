import { Request, Response, NextFunction } from 'express';
import { Controller } from './controller';
import * as express from 'express';
import { Categoria } from '../models/categoria';
import { AppDataSource } from '../../data-source';
import { CategoriaNotFoundException } from '../exceptions/CategoriaNotFoundException';

class CategoriaController implements Controller {
  path = '/categorias';
  router: express.Router = express.Router();
  repository = AppDataSource.getRepository(Categoria);

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
    const categorias = await this.repository.find();
    return res.json(categorias);
  };

  public show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const categoria = await this.repository.findOneBy({ id });
      if (!categoria) {
        throw new CategoriaNotFoundException(id);
      }
      return res.json(categoria);
    } catch (error) {
      next(error);
    }
  };

  public store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoria = await this.repository.save(req.body);
      return res.json(categoria);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = (({ id, ...body }) => body)(req.body);
      const id = parseInt(req.params.id, 10);
      const categoria = await this.repository.findOneBy({ id });
      if (!categoria) {
        return next(new CategoriaNotFoundException(id));
      }
      return res.json(await categoria.actualizar(body));
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const categoria = await this.repository.findOneBy({ id });
      if (!categoria) {
        throw new CategoriaNotFoundException(id);
      }
      await categoria.eliminar();
      return res.json({ message: 'Categoría eliminada' });
    } catch (error) {
      next(error);
    }
  };
}

export { CategoriaController };
