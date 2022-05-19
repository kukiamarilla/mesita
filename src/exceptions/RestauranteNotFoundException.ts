import HttpException from './HttpException';

export class RestauranteNotFoundException extends HttpException {
  constructor(id: number) {
    super(404, `Restaurante con id ${id} no encontrado`);
  }
}
