/* eslint linebreak-style: 0 */
import express from 'express';
import MenuController from '../controllers/menu';
import UserController from '../controllers/users';
import middlewares from '../middlewares';

const router = express.Router();

router.post('/auth/signup', middlewares.validateSignup, UserController.signup);
router.patch('/users/:id', middlewares.validateUpdateAdmin, UserController.updateAdminStatus);
router.post('/auth/login', middlewares.validateLogin, UserController.login);
router.get('/menu', MenuController.getMenu);

router.use('*', middlewares.verifyToken);
router.post('/menu', middlewares.validatePostMenu, MenuController.postMeal);

export default router;
