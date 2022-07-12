import { Request, Response, NextFunction } from 'express';
import { CarService as ICarService } from '../interfaces/CarService';
import { CarController as ICarController } from '../interfaces/CarController';

export default class CarController implements ICarController {
  private _carService: ICarService;

  constructor(carService: ICarService) {
    this._carService = carService;
  }

  public async create(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    try {
      const { model, year, color, status,
        buyValue, doorsQty, seatsQty } = req.body;
      const created = await this._carService.create({
        model,
        year,
        color,
        status,
        buyValue,
        doorsQty,
        seatsQty,
      });
      return res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  }

  public async read(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    try {
      const cars = await this._carService.read();
      return res.status(200).json(cars);
    } catch (error) {
      next(error);
    }
  }

  public async readOne(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    try {
      const { id } = req.params;
      const cars = await this._carService.readOne(id);
      return res.status(200).json(cars);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    try {
      const { id } = req.params;
      const { model, year, color, status,
        buyValue, doorsQty, seatsQty } = req.body;
      const car = { model, year, color, status, buyValue, doorsQty, seatsQty };
      const updated = await this._carService.update(id, car);
      return res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    try {
      const { id } = req.params;
      const car = await this._carService.delete(id);
      return res.status(200).json(car);
    } catch (error) {
      next(error);
    }
  }
}