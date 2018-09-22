import db from '../db';

const down = () => {
  db.none('DELETE FROM users;')
    .then(() => {
      console.log('Undo user seeds was successfull');
    })
    .catch((err) => {
      console.log(err);
    });
};

down();
