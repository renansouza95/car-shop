import App from './app';
import CustomRouter from './routes/CustomRoutes';
import CarController from './controllers/CarController';
import MotorcycleController from './controllers/MotorcycleController';
import { Car } from './interfaces/CarInterface';
import { Motorcycle } from './interfaces/MotorcycleInterface';

const server = new App();

const carController = new CarController();
const motoController = new MotorcycleController();

const carRouter = new CustomRouter<Car>();
const motoRouter = new CustomRouter<Motorcycle>();

carRouter.addRoute(carController);
motoRouter.addRoute(motoController);

server.addRouter(carRouter.router);
server.addRouter(motoRouter.router);

export default server;