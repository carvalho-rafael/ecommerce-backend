import { Router } from 'express';

import multer from 'multer';
import uploadConfig from './middleware/fileUpload';
import authMiddleware from './middleware/authMiddleware';

import AuthController from './controllers/AuthController';
import OrderController from './controllers/OrderController';
import ProductCategoryController from './controllers/ProductCategoryController';
import ProductController from './controllers/ProductController';
import UserController from './controllers/UserController';

const routes = Router();

const upload = multer(uploadConfig);

routes.post('/singup', UserController.store);
routes.post('/login', AuthController.authenticate);

routes.post('/createOrder', authMiddleware, OrderController.createOrder);

routes.get('/products', ProductController.index);
routes.post('/products', authMiddleware, upload.single('image'), ProductController.create);

routes.get('/product-category', ProductCategoryController.index);
routes.post('/product-category', authMiddleware, ProductCategoryController.create);

export default routes;
