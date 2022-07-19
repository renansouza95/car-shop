import { Vehicle } from './VehicleInterface';

enum Categories {
  'Street',
  'Custom',
  'Trail',
}

export interface Motorcycle extends Vehicle {
  category: keyof typeof Categories; // https://stackoverflow.com/questions/26855423/how-to-require-a-specific-string-in-typescript-interface
  engineCapacity: number;
}