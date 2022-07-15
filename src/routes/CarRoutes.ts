import { Router } from 'express';
import Controller from '../controllers/GenericController';
// import { CarController } from '../interfaces/CarController';
// import CarController from '../controllers/CarController';
// import CarService from '../services/CarService';
// import CarModel from '../models/CarModel';
// import carMongooseModel from '../schemas/CarSchema';

// const carRoutes = Router();
// const carModel = new CarModel(carMongooseModel);
// const carService = new CarService(carModel);
// const carController = new CarController(carService);

// carRoutes.get('/cars', carController.read);
// carRoutes.get('/cars/:id', carController.readOne);
// carRoutes.post('/cars', carController.create);
// carRoutes.put('/cars/:id', carController.update);
// carRoutes.delete('/cars/:id', carController.delete);

// export default carRoutes;

export default class CustomRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoute(controller: Controller<T>, route: string = controller.route) {
    this.router.get(route, (req, res, next) => controller.read(req, res, next));
  
    this.router.get(
      `${route}:/id`,
      (req, res, next) => controller.readOne(req, res, next),
    );
      
    this.router.post(
      route,
      (req, res, next) => controller.create(req, res, next),
    );

    this.router.put(
      `${route}:/id`,
      (req, res, next) => controller.update(req, res, next),
    );

    this.router.delete(
      `${route}:/id`,
      (req, res, next) => controller.delete(req, res, next),
    );
  }
}