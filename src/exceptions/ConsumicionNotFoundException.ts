import HttpException from './HttpException';

export class ConsumicionNotFoundException extends HttpException {
  constructor(id: number) {
    super(404, `Consumicion con id ${id} no encontrada`);
  }
}
