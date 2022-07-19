import NotFoundError from '../middlewares/errors/NotFoundError';
import BadRequestError from '../middlewares/errors/BadRequestError';
import MotorcycleModel from '../models/MotorcycleModel';
import GenericService from './GenericService';
import { Model } from '../interfaces/ModelInterface';
import { Motorcycle as IMoto } from '../interfaces/MotorcycleInterface';
import {
  MotorcycleService as IMotoService } from '../interfaces/MotorcycleService';

const NOTFOUND = 'Object not found';

const BADREQUEST = 'Id must have 24 hexadecimal characters';

const Categories = ['Street', 'Custom', 'Trail'];

class MotorcycleService extends GenericService<IMoto> implements IMotoService {
  constructor(model: Model<IMoto> = new MotorcycleModel()) {
    super(model);
    // o motoModel herda _model do constructor da GenericService
  }

  async create(motorcycle: IMoto): Promise<IMoto> {
    const verifyCategory = Categories.every((e) => e !== motorcycle.category);
    if (verifyCategory) throw new BadRequestError('Invalid fields');
    return this._model.create(motorcycle);
  }

  async read(): Promise<IMoto[]> {
    return this._model.read();
  }

  async readOne(id: string): Promise<IMoto | null> {
    if (id.length < 24) {
      throw new BadRequestError(BADREQUEST);
    }
    const moto = await this._model.readOne(id);
    if (!moto) throw new NotFoundError(NOTFOUND);
    return moto;
  }

  async update(id: string, motorcycle: IMoto): Promise<IMoto | null> {
    const verifyBody = Object.values(motorcycle).every((value) => (
      value === undefined
    ));
    if (verifyBody) throw new BadRequestError('Invalid fields');
    await this.readOne(id);
    const updated = await this._model.update(id, motorcycle);
    return updated;
  }

  async delete(id: string): Promise<IMoto | null> {
    await this.readOne(id);
    const moto = await this._model.delete(id);
    return moto;
  }
}

export default MotorcycleService;