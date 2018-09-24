/* eslint no-restricted-globals: "off" */
/* eslint max-len: "off" */

/**
 * This is a validation for user login
 * @constant
 * 
 * @param {String} message - any error message we provide
 * 
 * @returns {Object}
 */


const updateError = (message) => {
  const err = Error(message);
  err.statusCode = 400;
  return err;
};

/**
 * This is a validation for user login
 * @constant
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Object} next next object
 * 
 * @returns {Object} an object containing an error message if validation fails
 *
 * @exports validateLogin
 */

const validateUpdateAdmin = (req, res, next) => {
  let { adminUser } = req.body;
  let id = parseInt(req.params.id, 10);
  adminUser = adminUser && adminUser.toString().replace(/\s+/g, '');
  id = id && id.toString();

  if (!adminUser) return next(updateError('you must provide a value for adminUser'));
  if (adminUser !== '101' && adminUser !== '100') return next(updateError('invalid admin status code'));
  if (isNaN(id)) return next(updateError('invalid id, id should be a number'));

  return next();
};

export default validateUpdateAdmin;
