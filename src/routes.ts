import { Router } from 'express';
import AuthController from './controllers/AuthController';
import OrderController from './controllers/OrderController';
import UserController from './controllers/UserController';

const routes = Router();

routes.post('/singup', UserController.store);
routes.post('/login', AuthController.authenticate);

routes.post('/createOrder', OrderController.createOrder);

export default routes;
