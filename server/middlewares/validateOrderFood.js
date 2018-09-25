/* eslint no-restricted-globals: "off" */
/* eslint max-len: "off" */
/* eslint linebreak-style: "off" */


/**
 * function expression to handle error
 * @constant
 * 
 * @param {String} message - any error message we provide
 * 
 * @returns {Object}
 */

const orderError = (message) => {
  const err = Error(message);
  err.statusCode = 400;
  return err;
};

/**
 * This is a validation for food ordered
 * @constant
 *
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Object} next next object
 *
 * @returns {Object} an object containing an error message if validation fails
 *
 * @exports validateOrderFood
 */


const validateOrderFood = (req, res, next) => {
  let { deliveryAddress, telephone } = req.body;
  deliveryAddress = deliveryAddress && deliveryAddress.toString().trim();
  telephone = telephone && telephone.toString().trim();

  if (!deliveryAddress) return next(orderError('please provide a delivery address'));
  if (!telephone) return next(orderError('please provide a phone number we can reach you with'));
  if (!deliveryAddress && !telephone) return next(orderError('you did not provide an address and a phone number'));
  if (isNaN(telephone)) return next(orderError('telephone must be a number'));

  return next();
};
export default validateOrderFood;
