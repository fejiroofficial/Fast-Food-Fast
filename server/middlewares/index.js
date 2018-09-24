/* eslint linebreak-style: 0 */
import validateSignup from './validateSignup';
import validateUpdateAdmin from './validateUpdateAdmin';
import verifyToken from './verifyToken';

const middlewares = {
  validateSignup,
  verifyToken,
  validateUpdateAdmin,
};

export default middlewares;
