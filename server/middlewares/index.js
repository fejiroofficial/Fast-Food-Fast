/* eslint linebreak-style: 0 */
import validateSignup from './validateSignup';
import verifyToken from './verifyToken';
import validatePostMenu from './validatePostMenu';

const middlewares = {
  validateSignup,
  validatePostMenu,
  verifyToken,
};

export default middlewares;
