import GenericModel from './GenericModel';
import { Car } from '../interfaces/CarInterface';
import carMongooseModel from '../schemas/CarSchema';

export default class CarModel extends GenericModel<Car> {
  constructor(modelMongoose = carMongooseModel) {
    super(modelMongoose);
  }
}
