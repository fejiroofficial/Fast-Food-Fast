/* eslint linebreak-style: 0 */
import validateSignup from './validateSignup';
import validateLogin from './validateLogin';

const middlewares = {
  validateSignup,
  validateLogin,
};

export default middlewares;
