import allOrders from '../datastore/orders';
import users from '../datastore/users'; 
/**
 * fetch a specific order controller function
 * @constant
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * 
 * @returns {Object}
 *
 * @exports postOrder
 */
const postOrder = (req, res) => {
  let { meal } = req.body;
  meal = meal && meal.toString().trim().replace(/\s+/g, ' ');
  const id = allOrders.length + 1;
  const userId = parseInt(req.body.userId, 10);
  const quantity = parseInt(req.body.quantity, 10);
  const price = parseInt(req.body.price, 10);
  const createdAt = new Date().toISOString();
  const updatedAt = new Date().toISOString();
  const total = quantity * price;
  const orderStatus = 'pending';

  for (let i = 0; i < users.length; i++) {
    if (users[i].id === userId) {
      const fullname = users[i].fullname;
      const userTelephone = users[i].telephone;
      const address = users[i].address;

      const foodItems = [
        {
          meal, quantity, price,
        },
      ];

      const newOrder = {
        id,
        userId,
        fullname,
        userTelephone,
        address,
        foodItems,
        total,
        orderStatus,
        createdAt,
        updatedAt,
      };

      allOrders.push(newOrder);
      return res.status(201).json({
        success: 'true',
        message: 'you just ordered for a food',
        order: newOrder,
      });
    }
    if (users[i].id !== userId) {
      return res.status(401).json({
        success: 'false',
        message: 'unauthorized user, please sign up',
      });
    }
  }
};

export default postOrder;
