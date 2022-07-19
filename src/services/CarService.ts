import NotFoundError from '../middlewares/errors/NotFoundError';
import BadRequestError from '../middlewares/errors/BadRequestError';
import CarModel from '../models/CarModel';
import { Car as ICar } from '../interfaces/CarInterface';
import GenericService from './GenericService';
import { Model } from '../interfaces/ModelInterface';
import { CarService as ICarService } from '../interfaces/CarService';

const NOTFOUND = 'car not found';

const BADREQUEST = 'Id must have 24 hexadecimal characters';

class CarService extends GenericService<ICar> implements ICarService {
  constructor(model: Model<ICar> = new CarModel()) {
    super(model);
    // o carModel herda _model do constructor da GenericService
  }

  async create(car: ICar): Promise<ICar> {
    return this._model.create(car);
  }

  async read(): Promise<ICar[]> {
    return this._model.read();
  }

  async readOne(id: string): Promise<ICar | null> {
    if (id.length < 24) {
      throw new BadRequestError(BADREQUEST);
    }
    const car = await this._model.readOne(id);
    if (!car) throw new NotFoundError('Object not found');
    return car;
  }

  async update(id: string, car: ICar): Promise<ICar | null> {
    if (id.length < 24) {
      throw new BadRequestError(BADREQUEST);
    }
    const updated = await this._model.update(id, car);
    if (!updated) throw new NotFoundError(NOTFOUND);
    return updated;
  }

  async delete(id: string): Promise<ICar | null> {
    if (id.length < 24) {
      throw new BadRequestError(BADREQUEST);
    }
    const car = await this._model.delete(id);
    if (!car) throw new NotFoundError(NOTFOUND);
    return car;
  }
}

export default CarService;