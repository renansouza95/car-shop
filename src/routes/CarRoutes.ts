import { Router } from 'express';
import CarController from '../controllers/CarController';
import CarService from '../services/CarService';
import CarModel from '../models/CarModel';
import carMongooseModel from '../schemas/CarSchema';
// import { CarController } from '../interfaces/CarController';

const carRoutes = Router();
const carModel = new CarModel(carMongooseModel);
const carService = new CarService(carModel);
const carController = new CarController(carService);

carRoutes.get('/cars', carController.read);
carRoutes.get('/cars/:id', carController.readOne);
carRoutes.post('/cars', carController.create);
carRoutes.put('/cars/:id', carController.update);
carRoutes.delete('/cars/:id', carController.delete);

export default carRoutes;

// export default class CarRouter<T> {
//   public router: Router;

//   constructor() {
//     this.router = Router();
//   }

//   public addRoute(controller: Controller<T>, route: string = controller.route) {
//     this.router.get(route, controller.read);
//     this.router.get(`$route:/id`)
//   }
// }