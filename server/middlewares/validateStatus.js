const validateOrderStatus = (req, res, next) => {
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

  if (status.toLowerCase() !== 'processing'
    && status.toLowerCase() !== 'cancelled'
    && status.toLowerCase() !== 'complete') {
    const err = new Error('order status should be a (Processing), (cancelled) or a (complete)');
    err.statusCode = 400;
    return next(err);
  }

  return next();
};

export default validateOrderStatus;
