import { Model } from '../interfaces/ModelInterface';

export default abstract class GenericService<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  async create(entity: T): Promise<T> {
    return this._model.create(entity);
  }

  async read(): Promise<T[]> {
    return this._model.read();
  }

  async readOne(id: string): Promise<T | null> {
    return this._model.readOne(id);
  }

  async update(id: string, entity: T): Promise<T | null> {
    return this._model.update(id, entity);
  }

  async delete(id: string): Promise<T | null> {
    return this._model.delete(id);
  }
}