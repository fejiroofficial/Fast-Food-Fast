import bcrypt from 'bcrypt-nodejs';
import db from '../db';

/* eslint no-template-curly-in-string: "off" */

const salt = bcrypt.genSaltSync(10);
const users = [
  {
    firstname: 'Okeoghene',
    lastname: 'Gospel',
    email: 'oke@gmail.com',
    password: bcrypt.hashSync('123456', salt),
    telephone: 8138776199,
    adminUser: 100,
  },

  {
    firstname: 'Elooghene',
    lastname: 'Gospel',
    email: 'elorobust@gmail.com',
    password: bcrypt.hashSync('123456', salt),
    telephone: 8138776188,
    adminUser: 100,
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
