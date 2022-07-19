import { Motorcycle } from './MotorcycleInterface';

export interface MotorcycleService {
  create(entity: Motorcycle): Promise<Motorcycle>;
  read(): Promise<Motorcycle[]>;
  readOne(id: string): Promise<Motorcycle | null>;
  update(id: string, entity: Motorcycle): Promise<Motorcycle | null>;
  delete(id: string): Promise<Motorcycle | null>;
}