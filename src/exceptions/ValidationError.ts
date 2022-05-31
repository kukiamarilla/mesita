import HttpException from './HttpException';

export class ValidationError extends HttpException {
  constructor(message: string) {
    super(422, message);
  }
}
