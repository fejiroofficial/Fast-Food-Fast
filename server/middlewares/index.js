/* eslint linebreak-style: 0 */
import validateSignup from './validateSignup';
import verifyToken from './verifyToken';
import validatePostMenu from './validatePostMenu';
import validateLogin from './validateLogin';
import validateOrderFood from './validateOrderFood';
import validateCart from './validateCart';
import validateOrderStatus from './validateStatus';
import validateUpdateProf from './validateUpdateProf';
import validateUpdateCart from './validateUpdateCart';

const middlewares = {
  validateSignup,
  validatePostMenu,
  validateLogin,
  verifyToken,
  validateOrderFood,
  validateCart,
  validateOrderStatus,
  validateUpdateProf,
  validateUpdateCart,
};

export default middlewares;
