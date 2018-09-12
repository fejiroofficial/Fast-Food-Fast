const validatePostOrder = (req, res, next) => {
  let {
    userTelephone, address, meal, fullname, userId, quantity, price,
  } = req.body;

  userTelephone = userTelephone && userTelephone.toString().trim();
  address = address && address.toString().trim();
  meal = meal && meal.toString().trim();
  fullname = fullname && fullname.toString().trim();
  userId = userId && userId.toString().trim();

  if (isNaN(quantity)) {
    const err = new Error('quantity input should be a number');
    err.statusCode = 400;
    return next(err);
  }

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

  if (!fullname) {
    const err = new Error('Your full name is required');
    err.statusCode = 400;
    return next(err);
  }

  if (!userTelephone) {
    const err = new Error('Your phone number is required');
    err.statusCode = 400;
    return next(err);
  }
  if (!address) {
    const err = new Error('Your location is required');
    err.statusCode = 400;
    return next(err);
  }
  if (!meal) {
    const err = new Error('you have to order for something');
    err.statusCode = 400;
    return next(err);
  }

  if (!userId) {
    const err = new Error('unauthorized user');
    err.statusCode = 401;
    return next(err);
  }

  if (!quantity) {
    const err = new Error('Please provide the quantity of items');
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
