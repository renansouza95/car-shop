import { Car } from "../../../interfaces/CarInterface";
import { Service } from "../../../interfaces/ServiceInterface";

export class CarServiceMock implements Service<Car> {
  create(entity: Car): Promise<Car> {
    throw new Error("Method not implemented.");
  }
  read(): Promise<Car[]> {
    throw new Error("Method not implemented.");
  }
  readOne(id: string): Promise<Car | null> {
    throw new Error("Method not implemented.");
  }
  update(id: string, entity: Car): Promise<Car | null> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<Car | null> {
    throw new Error("Method not implemented.");
  }
}