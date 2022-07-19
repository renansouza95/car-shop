import { Car } from "../../../interfaces/CarInterface";
import { Model } from "../../../interfaces/ModelInterface";
import { carMock, carMockAndId } from "./CarMocks";

export class CarModelMock implements Model<Car> {
  async create(entity: Car): Promise<Car> {
    return entity;
  }
  async read(): Promise<Car[]> {
    return [carMock];
  }
  async readOne(id: string): Promise<Car | null> {
    if (id.length < 24) return null;
    if (carMockAndId._id !== id) return null;
    return carMock;
  }
  async update(id: string, entity: Car): Promise<Car | null> {
    if (id.length < 24) return null;
    if (carMockAndId._id !== id) return null;
    return entity;
  }
  async delete(id: string): Promise<Car | null> {
    if (id.length < 24) return null;
    if (carMockAndId._id !== id) return null;
    return carMock;
  }
}