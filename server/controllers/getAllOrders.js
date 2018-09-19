import allOrders from '../datastore/orders';
/**
 * fetch a specific order controller function
 * @constant
 * 
 * @param {String} req request object
 * @param {Object} res response object
 * 
 * @returns {Object}
 *
 * @exports getAllOrders
 */
const getAllOrders = (req, res) => {
  res.status(200).json({
    success: 'true',
    message: 'This is a list of all orders',
    orders: allOrders,
  });
};

export default getAllOrders;
