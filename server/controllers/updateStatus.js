import allOrders from '../datastore/orders';
/**
 * fetch a specific order controller function
 * @constant
 * 
 * @param {String} req request object
 * @param {Object} res response object
 * @param {Object} err error object
 * 
 * @returns {Object}
 *
 * @exports updateStatus
 */
const updateStatus = (req, res, err) => {
  const orderId = parseInt(req.params.id, 10);
  let { orderStatus } = req.body;
  orderStatus = orderStatus && orderStatus
    .toLowerCase().toString().trim().replace(/\s+/g, '');

  for (let i = 0; i < allOrders.length; i++) {
    if (allOrders[i].id === orderId) {
      allOrders[i].orderStatus = orderStatus;
      return res.status(200).json({
        success: 'true',
        message: 'order status updated',
        orderStatus,
      });
    } if (isNaN(orderId)) {
      return res.status(400).json({
        success: 'false',
        message: 'hooops! params should be a number e.g /1 and not /a',
      });
    }
    return res.status(404).json({
      success: 'false',
      message: 'Cannot update status of an order that does not exist',
    });
  }

  if (err) {
    return res.status(500).json({
      success: 'false',
      message: err.message,
    });
  }
};

export default updateStatus;
