import { Car } from "../../../interfaces/CarInterface";

const carMock: Car = {
  model: 'Ferrari',
  year: 1978,
  color: 'red',
  status: false,
  buyValue: 150000,
  doorsQty: 2,
  seatsQty: 2,
}

const carMockAndId = {
  model: 'Ferrari',
  year: 1978,
  color: 'red',
  status: false,
  buyValue: 150000,
  doorsQty: 2,
  seatsQty: 2,
  _id: '62c760648ae2a532c6797ffc',
}

const carIdMock = '62c760648ae2a532c6797ffc';

export { carMock, carMockAndId, carIdMock }