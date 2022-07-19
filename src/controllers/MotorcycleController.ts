import { Request, Response, NextFunction } from 'express';
import Controller from './GenericController';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import MotorcycleService from '../services/MotorcycleService';
import {
  MotorcycleService as IMotoService } from '../interfaces/MotorcycleService';

export default class MotorcycleController extends Controller<Motorcycle> {
  private _route: string;

  constructor(
    service: IMotoService = new MotorcycleService(),
    route = '/motorcycles',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  public async create(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    try {
      const { model, year, color, status,
        buyValue, category, engineCapacity } = req.body;
      const created = await this.service.create({
        model,
        year,
        color,
        status,
        buyValue,
        category,
        engineCapacity,
      });
      return res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  }

  public async read(_req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    try {
      const motorcycles = await this.service.read();
      return res.status(200).json(motorcycles);
    } catch (error) {
      next(error);
    }
  }

  public async readOne(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    try {
      const { id } = req.params;
      const motorcycles = await this.service.readOne(id);
      return res.status(200).json(motorcycles);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    try {
      const { id } = req.params;
      const { model, year, color, status,
        buyValue, category, engineCapacity } = req.body;
      const motorcycle = {
        model, year, color, status, buyValue, category, engineCapacity };
      const updated = await this.service.update(id, motorcycle);
      return res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    try {
      const { id } = req.params;
      const motorcycle = await this.service.delete(id);
      return res.status(204).json(motorcycle);
    } catch (error) {
      next(error);
    }
  }
}