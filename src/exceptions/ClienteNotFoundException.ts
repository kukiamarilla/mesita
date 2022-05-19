import HttpException from './HttpException';

export class ClienteNotFoundException extends HttpException {
  constructor(id: number) {
    super(404, `Cliente con id ${id} no encontrado`);
  }
}
