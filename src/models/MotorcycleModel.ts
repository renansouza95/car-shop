import GenericModel from './GenericModel';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import motoMongooseModel from '../schemas/MotorcycleSchema';

export default class MotorcycleModel extends GenericModel<Motorcycle> {
  constructor(modelMongoose = motoMongooseModel) {
    super(modelMongoose);
  }
}
