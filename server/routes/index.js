/* eslint linebreak-style: 0 */
/* eslint max-len: "off" */

import express from 'express';
import MenuController from '../controllers/menu';
import UserController from '../controllers/users';
import OrderController from '../controllers/order';
import middlewares from '../middlewares';

const router = express.Router();

router.post('/auth/signup', middlewares.validateSignup, UserController.signup);
router.patch('/users/:id', middlewares.validateUpdateAdmin, UserController.updateAdminStatus);
router.post('/auth/login', middlewares.validateLogin, UserController.login);
router.get('/menu', MenuController.getMenu);

router.use('*', middlewares.verifyToken);
router.post('/menu', middlewares.validatePostMenu, MenuController.postMeal);
router.post('/cart', middlewares.validateCart, OrderController.addToCart);
router.post('/orders', middlewares.validateOrderFood, OrderController.orderFood);
router.get('/orders', OrderController.getOrders);
router.get('/users/:id/orders', OrderController.orderHistory);

export default router;
