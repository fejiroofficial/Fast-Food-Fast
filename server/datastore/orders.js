/**
 * a list of all orders
 * @constant
 *
 * @type {Array<Object>}
 * 
 * @exports allOrders
 */
 const allOrders = [
  {
    id: 1,
    userId: 1,
    foodItems: [
      {
        meal: 'fried rice',
        quantity: 1,
        price: 500,
      },
    ],
    Total: 500,
    orderStatus: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default allOrders;

