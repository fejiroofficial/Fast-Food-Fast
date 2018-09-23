/* eslint no-restricted-globals: "off" */
/* eslint max-len: "off" */
/* eslint linebreak-style: "off" */


/**
 * This is a validation for user login
 * @constant
 * 
 * @param {String} message - any error message we provide
 * 
 * @returns {Object}
 */

const postMenuError = (message) => {
  const err = Error(message);
  err.statusCode = 400;
  return err;
};

/**
 * This is a validation for post menu
 * @constant
 *
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Object} next next object
 *
 * @returns {Object} an object containing an error message if validation fails
 *
 * @exports validatePostMenu
 */


const validatePostMenu = (req, res, next) => {
  let { itemName, price, foodImage } = req.body;
  itemName = itemName && itemName.toString().trim();
  const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/
  price = price && price.toString().trim();
  foodImage = foodImage && foodImage.toString();

  if (!itemName) return next(postMenuError('you must input a name for the food item'));
  if (!price) return next(postMenuError('please provide the price for the food item'));
  if (!foodImage) return next(postMenuError('please provide the image address for the food item'));
  if (!urlRegex.test(foodImage)) return next(postMenuError('URL is not valid'));
  if (!itemName && !price) return next(postMenuError('you must input an item name and price'));
  if (isNaN(price)) return next(postMenuError('food item price must be a number'));

  return next();
};
export default validatePostMenu;
