import HttpException from './HttpException';

export class HorarioNotFoundException extends HttpException {
  constructor(id: number) {
    super(404, `Horario con id ${id} no encontrado`);
  }
}
