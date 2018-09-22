/* eslint no-param-reassign: "off" */
/* eslint linebreak-style: 0 */

import path from 'path';
import Promise from 'bluebird';
import pgp, { QueryFile } from 'pg-promise';
import setup from '../config/config.json';
import User from '../models/users';

const sql = (file) => {
  // generate full path
  const fullPath = path.join(__dirname, file);
  return new QueryFile(fullPath, { minify: true });
};

// pg-promise initialization options
const initOptions = {
  promiseLib: Promise,
  extend(obj) {
    obj.users = new User(obj);
  },
};

const env = process.env.NODE_ENV || 'development';
const config = setup[env];

let $db;

// check if env is production
if (config.use_env_variable) {
  $db = pgp(initOptions)(process.env[config.use_env_variable]);
} else {
  $db = pgp(initOptions)(config);
}

const db = $db;

db
  .query(sql('./fastfood.sql'))
  .then(() => {
    console.log('Database successfully initialized');
  })
  .catch((err) => {
    console.log(err);
  });

export default db;
