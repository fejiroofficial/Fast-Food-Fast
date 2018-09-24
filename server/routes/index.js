/* eslint linebreak-style: 0 */
import express from 'express';
import UserController from '../controllers/users';
import middlewares from '../middlewares';

const router = express.Router();

router.post('/auth/signup', middlewares.validateSignup, UserController.signup);
router.patch('/users/:id', middlewares.validateUpdateAdmin, UserController.updateAdminStatus);
router.post('/auth/login', middlewares.validateLogin, UserController.login);

export default router;
