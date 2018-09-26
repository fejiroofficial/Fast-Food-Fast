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

const validateCart = (req, res, next) => {
  const { foodId, quantity } = req.body;

  if (!foodId) return next(cartError('please select a food item on the menu'));
  if (!quantity) return next(cartError('please provide the quantity for item'));
  if (isNaN(foodId)) return next(cartError('invalid food id'));
  if (isNaN(quantity)) return next(cartError('invalid quantity, quantity must be a number'));

  return next();
};

export default validateCart;


