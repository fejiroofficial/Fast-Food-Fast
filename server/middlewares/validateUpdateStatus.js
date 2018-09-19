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
 * @exports validateUpdateStatus
 */
const validateUpdateStatus = (req, res, next) => {
  let { orderStatus } = req.body;
  orderStatus = orderStatus && orderStatus.toString().trim();

  if (!orderStatus) {
    const err = new Error('order status is required');
    err.statusCode = 400;
    return next(err);
  }

  if (orderStatus === String(Number(orderStatus))) {
    const err = new Error('order status should not be a number');
    err.statusCode = 400;
    return next(err);
  }

  const status = req.body.orderStatus.toString().trim().replace(/\s+/g, '');

  if (status.toLowerCase() !== 'progress'
  && status.toLowerCase() !== 'delivered') {
    const err = new Error('order status should be a (progress) or a (delivered)');
    err.statusCode = 400;
    return next(err);
  }

  return next();
};

export default validateUpdateStatus;
