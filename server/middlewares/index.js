/* eslint linebreak-style: 0 */
import validateSignup from './validateSignup';
import validateUpdateAdmin from './validateUpdateAdmin';
import verifyToken from './verifyToken';
import validatePostMenu from './validatePostMenu';
import validateLogin from './validateLogin';
import validateOrderFood from './validateOrderFood';
import validateCart from './validateCart';
import validateOrderStatus from './validateStatus';

const middlewares = {
  validateSignup,
  validatePostMenu,
  validateLogin,
  verifyToken,
  validateUpdateAdmin,
  validateOrderFood,
  validateCart,
  validateOrderStatus,
};

export default middlewares;

