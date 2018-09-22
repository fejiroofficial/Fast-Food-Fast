/* eslint no-param-reassign: "off" */
/* eslint no-template-curly-in-string: "off" */
/* eslint max-len: "off" */

import bcrypt from 'bcrypt-nodejs';

export default class User {
  constructor(db) {
    this.db = db;
  }

  // create new user
  create(values) {
    values.password = bcrypt.hashSync(values.password, 10);
    const sql = 'INSERT INTO users(firstname, lastname, email, telephone, password, admin_user) VAlUES( ${firstname}, ${lastname}, ${email}, ${telephone}, ${password}, ${adminUser}) RETURNING id, firstname, lastname, email, telephone, admin_user';
    return this.db.one(sql, values);
  }

  // find user by id
  findById(id) {
    const sql = 'SELECT * FROM users WHERE id = $1';
    return this.db.oneOrNone(sql, id);
  }

  // find user by email
  findByEmail(email) {
    const sql = 'SELECT * FROM users WHERE email = $1';
    return this.db.oneOrNone(sql, email);
  }

  // remove user
  remove(id) {
    const sql = 'DELETE FROM users WHERE id = $1';
    return this.db.one(sql, id);
  }
}