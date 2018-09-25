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
    adminUser: 101,
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

const food_menu = [
  {
    itemName: 'cheese bugger',
    price: 1500,
    foodImage: 'http://google.jpg'
  },

  {
    itemName: 'egusi soup',
    price: 600,
    foodImage: 'http://google.jpg'
  }
]


const up = () => {
  db.tx((t) => {
    const queries = users
      .map(user => t.none('INSERT INTO users(firstname, lastname, email, telephone, password, admin_user) VALUES(${firstname}, ${lastname}, ${email}, ${telephone}, ${password}, ${adminUser})', user));
    return t.batch(queries);
  })
    .then(() => {
      console.log('Users seeded successfully');

      db.tx((t) => {
        const queries = food_menu
          .map(answer => t.none('INSERT INTO food_menu(item_name, price, food_image) VALUES(${itemName}, ${price}, ${foodImage})', answer));
        return t.batch(queries);
      })
        .then(() => {
          console.log('Menu seeded successfully');
        })
        .catch((err) => {
          console.log(err);
        })
    })
    .catch((err) => {
      console.log(err);
    });
};

up();
