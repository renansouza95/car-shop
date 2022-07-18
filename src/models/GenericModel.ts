import { Model, isValidObjectId } from 'mongoose';
import { Model as ModelInterface } from '../interfaces/ModelInterface';
import BadRequestError from '../middlewares/errors/BadRequestError';

const ERROR_MSG = 'Id must have 24 hexadecimal characters';
export default abstract class GenericModel<T> implements ModelInterface<T> {
  protected _modelMongoose: Model<T>;

  constructor(modelMongoose: Model<T>) {
    this._modelMongoose = modelMongoose;
  }

  async create(entity: T): Promise<T> {
    const created = await this._modelMongoose.create(entity);
    return created;
  }

  async read(): Promise<T[]> {
    const findAll = await this._modelMongoose.find();
    return findAll;
  }

  async readOne(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) {
      throw new BadRequestError(ERROR_MSG);
    }
    const findOne = await this._modelMongoose.findById(id);
    return findOne;
  }

  async update(id: string, entity: T): Promise<T | null> {
    if (!isValidObjectId(id)) {
      throw new BadRequestError(ERROR_MSG);
    }
    const updated = await this._modelMongoose
      .findOneAndUpdate({ _id: id }, entity, { returnOriginal: false });
    return updated;
  }

  async delete(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) {
      throw new BadRequestError(ERROR_MSG);
    }
    const deleted = await this._modelMongoose.findOneAndDelete({ _id: id });
    return deleted;
  }
}