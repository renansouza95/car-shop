import CustomError from './CustomError';

export default class BadRequest extends CustomError {
  constructor(message: string) {
    super(message, 400);
  }
}