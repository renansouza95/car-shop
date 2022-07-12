import { Car } from './CarInterface';

export interface CarService {
  create(entity: Car): Promise<Car>;
  read(): Promise<Car[]>;
  readOne(id: string): Promise<Car | null>;
  update(id: string, entity: Car): Promise<Car | null>;
  delete(id: string): Promise<Car | null>;
}