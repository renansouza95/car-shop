// import { z } from 'zod';

export interface Vehicle {
  model: string;
  year: number;
  color: string;
  status?: boolean;
  buyValue: number;
}

// const VehicleSchema = z.object({
//   model: z.string().min(3),
//   year: z.number().gte(1900).lte(2022),
//   color: z.string().min(3),
//   status: z.boolean().optional(),
//   buyValue: z.number(),
// });

// type Vehicle = z.infer<typeof VehicleSchema>;

// export { Vehicle, VehicleSchema };