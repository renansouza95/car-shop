import { Motorcycle } from "../../../interfaces/MotorcycleInterface";

const motoMock: Motorcycle = {
  model: 'Honda CG Titan 125',
  year: 1963,
  color: 'red',
  status: false,
  buyValue: 3500,
  category: 'Street',
  engineCapacity: 125,
}

const motoMockAndId = {
  model: 'Honda CG Titan 125',
  year: 1963,
  color: 'red',
  status: false,
  buyValue: 3500,
  category: 'Street',
  engineCapacity: 125,
  _id: '62c760648ae2a532c6797ffc',
}

const motoIdMock = '62c760648ae2a532c6797ffc';

export { motoMock, motoMockAndId, motoIdMock }