import allOrders from '../datastore/orders';
import users from '../datastore/orders';

const postOrder = (req, res) => {
  let { meal } = req.body;

  meal = meal && meal.toString().trim().replace(/\s+/g, ' ');

  const userId = parseInt(req.body.userId, 10);
  const quantity = parseInt(req.body.quantity, 10);
  const price = parseInt(req.body.price, 10);
  const now = new Date().toISOString();
  const Total = quantity * price;

  for (const i = 0; i < users.length; i++) {
    if (users[i].id === userId) {
      console.log (user[i]);
    }
  }

  // const foodItems = [
  //   {
  //     meal, quantity, price,
  //   },
  // ];

  // const orderStatus = 'pending';


  // const newOrder = {
  //   id: allOrders.length + 1,
  //   userId,
  //   fullname,
  //   userTelephone,
  //   address,
  //   foodItems,
  //   Total,
  //   orderStatus,
  //   createdAt: now,
  //   updatedAt: now,
  // };

  // allOrders.push(newOrder);
  // return res.status(201).json({
  //   success: 'true',
  //   message: 'you just ordered for a food',
  //   order: newOrder,
  // });
};

export default postOrder;
