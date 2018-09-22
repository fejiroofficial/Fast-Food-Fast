/* eslint no-shadow: "off" */
/* eslint max-len: "off" */
/* eslint arrow-body-style: "off" */
/* eslint linebreak-style: "off" */
/* eslint object-curly-newline: "off" */
/* eslint no-param-reassign: "off" */

import jwt from 'jsonwebtoken';
import db from '../db';

class UserController {
  static signup(req, res) {
    const adminUser = false;
    let { firstname, lastname, email, telephone } = req.body;
    const { password } = req.body;
    firstname = firstname ? firstname.toString().trim().replace(/\s+/g, '') : firstname;
    lastname = lastname ? lastname.toString().trim().replace(/\s+/g, '') : lastname;
    telephone = telephone ? telephone.toString().trim().replace(/\s+/g, '') : telephone;
    email = email ? email.toString().trim() : email;

    return db.task('signup', db => db.users.findByEmail(email)
      .then((result) => {
        if (result) {
          return res.status(409).json({
            success: 'false',
            message: 'user with this email already exists',
          });
        }
       

        return db.users.create({ firstname, lastname, email, telephone, password, adminUser })
          .then((user) => {
            const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '24hrs' });
            const userDetails = { ...user };
            res.status(201).json({
              success: 'true',
              message: 'Account created successfully',
              userDetails,
              token,
            });
          });
      })
      .catch((err) => {
        return res.status(500).json({
          success: 'false',
          message: 'unable to create user account',
          err: err.message,
        });
      }));
  }
}

export default UserController;
