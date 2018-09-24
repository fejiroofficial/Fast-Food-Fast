/* eslint linebreak-style: 0 */
import validateSignup from './validateSignup';
import validateUpdateAdmin from './validateUpdateAdmin';
import verifyToken from './verifyToken';
import validateLogin from './validateLogin';

const middlewares = {
  validateSignup,
  validateLogin,
  verifyToken,
  validateUpdateAdmin,
};

export default middlewares;
