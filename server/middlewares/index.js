/* eslint linebreak-style: 0 */
import validateSignup from './validateSignup';
import verifyToken from './verifyToken';
import validateLogin from './validateLogin';

const middlewares = {
  validateSignup,
  validateLogin,
  verifyToken,
};

export default middlewares;
