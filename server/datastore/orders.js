const users = [
  {
    id: 1,
    fullname: 'Fejiro Gospel',
    email: 'houseofjiro@gmail.com',
    telephone: '08138776199',
    address: '14 shomolu street, mushin, lagos',
    password: '123456',
  },
];

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

export default users;

export default allOrders;

