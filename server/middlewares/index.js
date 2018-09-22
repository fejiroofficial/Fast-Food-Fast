/* eslint linebreak-style: 0 */
import validateSignup from './validateSignup';
import verifyToken from './verifyToken';

const middlewares = {
  validateSignup,
  verifyToken,
};

export default middlewares;
