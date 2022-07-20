import { Motorcycle } from "../../../interfaces/MotorcycleInterface";
import { Service } from "../../../interfaces/ServiceInterface";
import { motoMock, motoMockAndId } from "./MotoMocks";

export class MotoServiceMock implements Service<Motorcycle> {
  async create(entity: Motorcycle): Promise<Motorcycle> {
    return entity;
  }
  async read(): Promise<Motorcycle[]> {
    return [motoMock];
  }
  async readOne(id: string): Promise<Motorcycle | null> {
    if (id.length < 24) return null;
    if (motoMockAndId._id !== id) return null;
    return motoMock;
  }
  async update(id: string, entity: Motorcycle): Promise<Motorcycle | null> {
    if (id.length < 24) return null;
    if (motoMockAndId._id !== id) return null;
    return entity;
  }
  async delete(id: string): Promise<Motorcycle | null> {
    if (id.length < 24) return null;
    if (motoMockAndId._id !== id) return null;
    return motoMock;
  }
}