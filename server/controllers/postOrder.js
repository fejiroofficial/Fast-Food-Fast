import allOrders from '../datastore/orders';

const postOrder = (req, res) => {
  let {
    userTelephone, address, meal, fullname,
  } = req.body;

  fullname = fullname && fullname.toString().trim().replace(/\s+/g, ' ');
  userTelephone = userTelephone && userTelephone.toString().trim().replace(/\s+/g, '');
  address = address && address.toString().trim().replace(/\s+/g, ' ');
  meal = meal && meal.toString().trim().replace(/\s+/g, ' ');

  const userId = parseInt(req.body.userId, 10);
  const quantity = parseInt(req.body.quantity, 10);
  const price = parseInt(req.body.price, 10);
  const now = new Date().toISOString();
  const Total = quantity * price;

  const foodItems = [
    {
      meal, quantity, price,
    },
  ];

  const orderStatus = 'pending';


  const newOrder = {
    id: allOrders.length + 1,
    fullname,
    userId,
    userTelephone,
    address,
    foodItems,
    Total,
    orderStatus,
    createdAt: now,
    updatedAt: now,
  };

  allOrders.push(newOrder);
  return res.status(201).json({
    success: 'true',
    message: 'you just ordered for a food',
    order: newOrder,
  });
};

export default postOrder;
