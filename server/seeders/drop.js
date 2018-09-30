import db from '../db';

const drop = () => {
  db.none('DROP TABLE food_menu; DROP TABLE cart; DROP TABLE food_ordered; DROP TABLE order_status;  DROP TABLE placed_order; DROP TABLE users;')
    .then(() => {
      console.log('cart, food_menu, food_ordered, placed_order, order_status, users tables were dropped successfully');
    })
    .catch((err) => {
      console.log(err);
    });
};

drop();
