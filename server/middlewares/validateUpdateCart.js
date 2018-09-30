/* eslint no-restricted-globals: "off" */
/* eslint max-len: "off" */

/**
 * @constant
 * 
 * @param {String} message - any error message we provide
 * 
 * @returns {Object}
 */


const cartError = (message) => {
  const err = Error(message);
  err.statusCode = 400;
  return err;
};

/**
 * This is a validation for cart input
 * @constant
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Object} next next object
 * 
 * @returns {Object} an object containing an error message if validation fails
 *
 * @exports validateCart
 */

const validateUpdateCart = (req, res, next) => {
  let { quantity } = req.body;
  quantity = quantity && quantity.toString().replace(/\s+/g, '');

  if (!quantity) return next(cartError('please provide the quantity for item'));
  if (isNaN(quantity)) return next(cartError('invalid quantity, quantity must be a number'));

  return next();
};

export default validateUpdateCart;
