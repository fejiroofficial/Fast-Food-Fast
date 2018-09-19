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
 * @exports fetchOrders
 */
const fetchOrders = (req, res, err) => {
  const orderId = parseInt(req.params.id, 10);

  for (let i = 0; i < allOrders.length; i++) {
    if (allOrders[i].id === orderId) {
      return res.status(200).json({
        success: 'true',
        message: 'order found',
        order: allOrders[i],
      });
    } if (isNaN(orderId)) {
      return res.status(400).json({
        success: 'false',
        message: 'hooops! params should be a number e.g /1 and not /a',
      });
    }
    return res.status(404).json({
      success: 'false',
      message: 'This order does not exist in the database',
    });
  }

  if (err) {
    return res.status(500).json({
      success: 'false',
      message: err.message,
    });
  }
};

export default fetchOrders;