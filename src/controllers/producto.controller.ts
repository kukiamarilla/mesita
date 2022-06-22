import { Router, Request, Response, NextFunction } from 'express';
import { Controller } from './controller';
import { AppDataSource } from '../../data-source';
import { Producto } from '../models/producto';
import { Categoria } from '../models/categoria';
import { nextTick } from 'process';
import { ProductoNotFoundException } from '../exceptions/ProductoNotFoundException';
import { CategoriaNotFoundException } from '../exceptions/CategoriaNotFoundException';

class ProductoController implements Controller {
  path = '/productos';
  router = Router();
  repository = AppDataSource.getRepository(Producto);
  categoriaRepository = AppDataSource.getRepository(Categoria);

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
      const producto = await this.repository.findOneBy({ id });
      if (!producto) {
        throw new ProductoNotFoundException(id);
      }
      return res.json(producto);
    } catch (error) {
      next(error);
    }
  };

  public store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const producto = await Producto.crear(body);
      return res.json(producto);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const id = parseInt(req.params.id, 10);
      const producto = await this.repository.findOneBy({ id });
      if (!producto) {
        throw new ProductoNotFoundException(id);
      }
      return res.json(await producto.actualizar(body));
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const producto = await this.repository.findOneBy({ id });
      if (!producto) {
        throw new ProductoNotFoundException(id);
      }
      producto.eliminar();
      return res.json({ message: 'Producto eliminado' });
    } catch (error) {
      next(error);
    }
  };
}

export { ProductoController };
