/* eslint linebreak-style: 0 */
import express from 'express';
import UserController from '../controllers/signup';
import middlewares from '../middlewares';

const router = express.Router();

router.post('/auth/signup', middlewares.validateSignup, UserController.signup);

export default router;
