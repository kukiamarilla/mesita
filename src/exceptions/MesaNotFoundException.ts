import HttpException from './HttpException';

export class MesaNotFoundException extends HttpException {
  constructor(id: number) {
    super(404, `Mesa con id ${id} no encontrado`);
  }
}
