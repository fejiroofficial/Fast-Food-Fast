/* eslint linebreak-style: 0 */
/* eslint max-len: "off" */

import express from 'express';
import MenuController from '../controllers/menu';
import UserController from '../controllers/users';
import OrderController from '../controllers/order';
import middlewares from '../middlewares';

const router = express.Router();

router.post('/auth/signup', middlewares.validateSignup, UserController.signup);
router.post('/auth/login', middlewares.validateLogin, UserController.login);
router.get('/menu', MenuController.getMenu);

router.use('*', middlewares.verifyToken);
router.patch('/users/:id', middlewares.validateUpdateProf, UserController.updateUser);
router.post('/menu', middlewares.validatePostMenu, MenuController.postMeal);
router.put('/menu/:id', middlewares.validatePostMenu, MenuController.modifyFoodOnMenu);
router.delete('/menu/:id', MenuController.deleteFoodFromMenu);
router.post('/cart', middlewares.validateCart, OrderController.addToCart);
router.get('/cart', OrderController.getCart);
router.delete('/cart', OrderController.deleteCart);
router.patch('/cart/:id', middlewares.validateUpdateCart, OrderController.modifyCart);
router.post('/orders', middlewares.validateOrderFood, OrderController.orderFood);
router.get('/orders', OrderController.getOrders);
router.get('/users/:id/orders', OrderController.orderHistory);
router.get('/orders/:id', OrderController.getOrder);
router.patch('/orders/:id', middlewares.validateOrderStatus, OrderController.orderStatus);


export default router;
