import HttpException from './HttpException';

export class ConsumicionClosedException extends HttpException {
  constructor(id: number) {
    super(400, `Consumicion con id ${id} ya está cerrada`);
  }
}
