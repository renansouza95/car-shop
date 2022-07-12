import { Model } from 'mongoose';
import GenericModel from './GenericModel';
import { Car } from '../interfaces/CarInterface';

export default class CarModel extends GenericModel<Car> {
  constructor(modelMongoose: Model<Car>) {
    super(modelMongoose);
    this._modelMongoose = modelMongoose;
  }
}