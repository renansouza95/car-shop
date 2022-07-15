import { Error } from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import CustomError from './errors/CustomError';

export default function errorMiddleware(
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  // se for um erro derivado do custom error eu posso pegar o status code do erro e retornar
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ error: error.message });
  }
  // se for um error de validação do mongoose posso retornar 400 e a mensagem do erro
  if (error instanceof Error.ValidationError) {
    return res.status(400).json({ message: error.message });
  }
  // se for um erro desconhecido, retorno 500 e mostro no log para acompanhamento da equipe de dev
  console.log(error);
  return res.status(500).json({ message: 'internal error' });
}