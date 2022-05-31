import HttpException from './HttpException';

export class DataMismatchException extends HttpException {
  constructor(message: string) {
    super(400, message);
  }
}
