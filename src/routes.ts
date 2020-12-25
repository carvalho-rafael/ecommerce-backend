import { Router } from 'express';
import OrderController from './controllers/OrderController';

const routes = Router();

routes.post('/createOrder', OrderController.createOrder);

export default routes;
