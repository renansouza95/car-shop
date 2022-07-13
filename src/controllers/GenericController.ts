import { NextFunction, Request, Response } from 'express';
import GenericService from '../services/GenericService';

export default abstract class GenericController<T> {
  abstract route: string;

  constructor(protected service: GenericService<T>) {}

  abstract create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<typeof res | void>;

  abstract read(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<typeof res | void>;

  abstract readOne(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<typeof res | void>;

  abstract update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<typeof res | void>;

  abstract delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<typeof res | void>;
}

// export type ResponseError = {
//   error: unknown;
// };

// export interface RequestWithBody<T> extends Request {
//   body: T;
// }

// abstract create(
//   req: RequestWithBody<T>,
//   res: Response<T | ResponseError>,
// ): Promise<typeof res>;

// abstract read(
//   _req: Request,
//   res: Response<T[] | ResponseError>,
// ): Promise<typeof res | void>;

// abstract readOne(
//   req: Request<{ id: string }>,
//   res: Response<T | ResponseError>,
// ): Promise<typeof res>;

// abstract update(
//   req: Request<{ id: string, entity: T }>,
//   res: Response<T | ResponseError>,
// ): Promise<typeof res>;

// abstract delete(
//   req: Request<{ id: string }>,
//   res: Response<T | ResponseError>,
// ): Promise<typeof res>;