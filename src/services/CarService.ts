import BadRequest from '../middlewares/errors/NotFoundError';
import CarModel from '../models/CarModel';
import { Car as ICar } from '../interfaces/CarInterface';
import GenericService from './GenericService';
// import { CarService as ICarService } from '../interfaces/CarService';
// import { Model } from '../interfaces/ModelInterface';

const ERROR_MSG = 'car not found';

export default class CarService extends GenericService<ICar> {
  // private _carModel: Model<ICar>;

  constructor(model = new CarModel()) {
    super(model);
    // o carModel herda _model do constructor da GenericService
    // this._carModel = carModel;
  }

  async create(car: ICar): Promise<ICar> {
    return this._model.create(car);
  }

  async read(): Promise<ICar[]> {
    return this._model.read();
  }

  async readOne(id: string): Promise<ICar | null> {
    const car = await this._model.readOne(id);
    if (!car) throw new BadRequest(ERROR_MSG);
    return car;
  }

  async update(id: string, car: ICar): Promise<ICar | null> {
    const updated = await this._model.update(id, car);
    if (!updated) throw new BadRequest(ERROR_MSG);
    return updated;
  }

  async delete(id: string): Promise<ICar | null> {
    const car = await this._model.delete(id);
    if (!car) throw new BadRequest(ERROR_MSG);
    return car;
  }
}