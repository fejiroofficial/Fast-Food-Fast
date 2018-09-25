import db from '../db';

const down = () => {
  db.none('DELETE FROM users; DELETE FROM food_menu;')
    .then(() => {
      console.log('Undo users, food_menu seeds were successful');
    })
    .catch((err) => {
      console.log(err);
    });
};

down();
