/**
 * This is a validation for post order
 * @constant
 * 
 * @param {String} req request object
 * @param {Object} res response object
 * @param {Object} err error object
 * 
 * @returns {Object}
 *
 * @exports validatePostOrder
 */
const validatePostOrder = (req, res, next) => {
  let {
    meal, userId, quantity, price,
  } = req.body;

  meal = meal && meal.toString().trim();
  userId = userId && userId.toString().trim();


  if (isNaN(price)) {
    const err = new Error('price input should be a number');
    err.statusCode = 400;
    return next(err);
  }

  if (isNaN(userId)) {
    const err = new Error('user id should be a number');
    err.statusCode = 400;
    return next(err);
  }

  if (!meal) {
    const err = new Error('you have to order for something');
    err.statusCode = 400;
    return next(err);
  }

  if (!userId) {
    const err = new Error('unauthorized user, please sign up');
    err.statusCode = 401;
    return next(err);
  }

  if (!quantity) {
    const err = new Error('Please provide the quantity of items');
    err.statusCode = 400;
    return next(err);
  }


  if (isNaN(quantity)) {
    const err = new Error('quantity input should be a number');
    err.statusCode = 400;
    return next(err);
  }

  if (!price) {
    const err = new Error('Please input a price for this item');
    err.statusCode = 400;
    return next(err);
  }

  return next();
};

export default validatePostOrder;
