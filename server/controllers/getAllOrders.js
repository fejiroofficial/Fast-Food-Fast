import allOrders from '../datastore/orders';

const getAllOrders = (req, res) => {
  res.status(200).json({
    success: 'true',
    message: 'This is a list of all orders',
    orders: allOrders,
  });
};

export default getAllOrders;
