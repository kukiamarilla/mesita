import { Router, Request, Response, NextFunction } from 'express';
import { Controller } from './controller';
import { AppDataSource } from '../../data-source';
import { Reserva } from '../models/reserva';
import { ValidationError } from '../exceptions/ValidationError';

class ReservaController implements Controller {
  path = '/reservas';
  router = Router();
  reservaRepository = AppDataSource.getRepository(Reserva);

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.get(this.path, this.index);
    this.router.post(this.path, this.store);
  }

  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.query.restaurante)
        throw new ValidationError('El parametro restaurante es requerido');
      if (!req.query.fecha)
        throw new ValidationError('El parametro fecha es requerido');
      const restaurante = req.query.restaurante as string;
      const fecha = req.query.fecha as string;
      const cliente = req.query.cliente;

      const where: any = {
        restaurante: {
          id: restaurante,
        },
        fecha,
      };
      if (cliente) {
        where.cliente = {
          id: cliente,
        };
      }
      const reservas = await this.reservaRepository.find({
        where,
        order: {
          horario: {
            horaInicio: 'ASC',
          },
          mesa: {
            nombre: 'ASC',
          },
        },
      });
      return res.json(reservas);
    } catch (error) {
      next(error);
    }
  };

  store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reserva = await Reserva.crear(req.body);
      return res.json(reserva);
    } catch (error) {
      next(error);
    }
  };
}

export { ReservaController };
