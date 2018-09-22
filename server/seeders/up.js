import bcrypt from 'bcrypt';
import db from '../db';

const users = [
  {
    firstname: 'Okeoghene',
    lastname: 'Gospel',
    email: 'oke@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    telephone: 8138776199,
    adminUser: 'false',
  },

  {
    firstname: 'Elooghene',
    lastname: 'Gospel',
    email: 'elorobust@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    telephone: 8138776199,
    adminUser: 'false',
  },
];


const up = () => {
  db.tx((t) => {
    const queries = users
      .map(user => t.none('INSERT INTO users(firstname, lastname, email, telephone, password, admin_user) VALUES(${firstname}, ${lastname}, ${email}, ${telephone}, ${password}, ${adminUser})', user));
    return t.batch(queries);
  })
    .then(() => {
      console.log('Users seeded successfully');
    })
    .catch((err) => {
      console.log(err);
    });
};

up();
