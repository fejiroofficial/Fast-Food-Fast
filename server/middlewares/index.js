/* eslint linebreak-style: 0 */
import validateSignup from './validateSignup';
import verifyToken from './verifyToken';
import validatePostMenu from './validatePostMenu';
import validateLogin from './validateLogin';

const middlewares = {
  validateSignup,
  validatePostMenu,
  validateLogin,
  verifyToken,
};

export default middlewares;
