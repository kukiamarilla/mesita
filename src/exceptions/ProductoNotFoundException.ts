import HttpException from './HttpException';

export class ProductoNotFoundException extends HttpException {
  constructor(id: number) {
    super(404, `Producto con id ${id} no encontrado`);
  }
}