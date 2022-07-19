import { Schema, model } from 'mongoose';
import { Motorcycle } from '../interfaces/MotorcycleInterface';

const motorcycleSchema = new Schema<Motorcycle>({
  model: { type: String, required: true, minlength: 3 },
  year: { type: Number, required: true, min: 1900, max: 2022 },
  color: { type: String, required: true, minlength: 3 },
  status: { type: Boolean, required: false },
  buyValue: { type: Number, required: true },
  category: { type: String, required: true },
  engineCapacity: { type: Number, required: true, min: 1, max: 2500 },
}, { versionKey: false });

const motoMongooseModel = model<Motorcycle>('Motorcycles', motorcycleSchema);

export default motoMongooseModel;