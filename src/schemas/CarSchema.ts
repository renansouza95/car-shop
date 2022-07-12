import { Schema, model } from 'mongoose';
import { Car } from '../interfaces/CarInterface';

// export interface CarDocument extends Car, Document {}

const carSchema = new Schema<Car>({
  model: { type: String, required: true, minlength: 3 },
  year: { type: Number, required: true, min: 1990, max: 2022 },
  color: { type: String, required: true, minlength: 3 },
  status: { type: Boolean, required: false },
  buyValue: { type: Number, required: true },
  doorsQty: { type: Number, required: true, min: 2, max: 4 },
  seatsQty: { type: Number, required: true, min: 2, max: 7 },
});

const carMongooseModel = model<Car>('Cars', carSchema);

export default carMongooseModel;