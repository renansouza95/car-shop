import { Request, Response, NextFunction } from 'express';
import Controller from './GenericController';
import { Car } from '../interfaces/CarInterface';
import CarService from '../services/CarService';
import { CarService as ICarService } from '../interfaces/CarService';

export default class CarController extends Controller<Car> {
  private _route: string;

  constructor(service: ICarService = new CarService(), route = '/cars') {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  public async create(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    try {
      const { model, year, color, status,
        buyValue, doorsQty, seatsQty } = req.body;
      const created = await this.service.create({
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

  public async read(_req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    try {
      const cars = await this.service.read();
      return res.status(200).json(cars);
    } catch (error) {
      next(error);
    }
  }

  public async readOne(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    try {
      const { id } = req.params;
      const cars = await this.service.readOne(id);
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
      const updated = await this.service.update(id, car);
      return res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    try {
      const { id } = req.params;
      const car = await this.service.delete(id);
      return res.status(204).json(car);
    } catch (error) {
      next(error);
    }
  }
}