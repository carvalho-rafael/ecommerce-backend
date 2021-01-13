import { Router } from 'express';
import AuthController from './controllers/AuthController';
import OrderController from './controllers/OrderController';
import ProductCategoryController from './controllers/ProductCategoryController';
import ProductController from './controllers/ProductController';
import UserController from './controllers/UserController';

const routes = Router();

routes.post('/singup', UserController.store);
routes.post('/login', AuthController.authenticate);

routes.post('/createOrder', OrderController.createOrder);

routes.get('/products', ProductController.index);
routes.post('/products', ProductController.create);

routes.get('/product-category', ProductCategoryController.index);
routes.post('/product-category', ProductCategoryController.create);

export default routes;
