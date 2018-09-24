/* eslint linebreak-style: 0 */
import validateSignup from './validateSignup';
import verifyToken from './verifyToken';
import validateLogin from './validateLogin';
import validatePostMenu from './validatePostMenu';

const middlewares = {
  validateSignup,
  validateLogin,
  verifyToken,
  validatePostMenu,
};

export default middlewares;
