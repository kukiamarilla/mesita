import HttpException from './HttpException';

export class CategoriaNotFoundException extends HttpException {
  constructor(id: number) {
    super(404, `Categoria con id ${id} no encontrada`);
  }}
