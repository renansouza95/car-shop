import { Router } from 'express';
import Controller from '../controllers/GenericController';

export default class CustomRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoute(controller: Controller<T>, route: string = controller.route) {
    this.router.get(
      `${route}/:id`,
      (req, res, next) => controller.readOne(req, res, next),
    );

    this.router.get(route, (req, res, next) => controller.read(req, res, next));
      
    this.router.post(
      route,
      (req, res, next) => controller.create(req, res, next),
    );

    this.router.put(
      `${route}/:id`,
      (req, res, next) => controller.update(req, res, next),
    );

    this.router.delete(
      `${route}/:id`,
      (req, res, next) => controller.delete(req, res, next),
    );
  }
}