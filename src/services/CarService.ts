import BadRequest from '../middlewares/errors/NotFoundError';
import { Model } from '../interfaces/ModelInterface';
import { Car as ICar } from '../interfaces/CarInterface';
import { CarService as ICarService } from '../interfaces/CarService';

const ERROR_MSG = 'car not found';

export default class CarService implements ICarService {
  private _carModel: Model<ICar>;

  constructor(carModel: Model<ICar>) {
    this._carModel = carModel;
  }

  async create(car: ICar): Promise<ICar> {
    return this._carModel.create(car);
  }

  async read(): Promise<ICar[]> {
    return this._carModel.read();
  }

  async readOne(id: string): Promise<ICar | null> {
    const car = await this._carModel.readOne(id);
    if (!car) throw new BadRequest(ERROR_MSG);
    return car;
  }

  async update(id: string, car: ICar): Promise<ICar | null> {
    const updated = await this._carModel.update(id, car);
    if (!updated) throw new BadRequest(ERROR_MSG);
    return updated;
  }

  async delete(id: string): Promise<ICar | null> {
    const car = await this._carModel.delete(id);
    if (!car) throw new BadRequest(ERROR_MSG);
    return car;
  }
}