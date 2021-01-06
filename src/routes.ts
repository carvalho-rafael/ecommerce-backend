import { Router } from 'express';
import OrderController from './controllers/OrderController';
import UserController from './controllers/UserController';

const routes = Router();

routes.post('/user', UserController.store);

routes.post('/createOrder', OrderController.createOrder);

export default routes;
