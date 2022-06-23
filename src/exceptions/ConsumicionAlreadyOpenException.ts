import HttpException from './HttpException';

export class ConsumicionAlreadyOpenException extends HttpException {
  constructor(id: number) {
    super(400, `Consumicion ya está abierta en la mesa con id ${id}`);
  }
}
