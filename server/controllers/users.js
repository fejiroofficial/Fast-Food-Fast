/* eslint no-shadow: "off" */
/* eslint max-len: "off" */
/* eslint arrow-body-style: "off" */
/* eslint linebreak-style: "off" */
/* eslint object-curly-newline: "off" */
/* eslint no-param-reassign: "off" */

import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import db from '../db';


/** user controller class */

class UserController {
  /**
 * @function signup
 * @memberof UserController
 * @static
 */
  static signup(req, res) {
    const adminUser = 100;
    let { firstname, lastname, email, telephone } = req.body;
    const { password } = req.body;
    firstname = firstname ? firstname.toString().replace(/\s+/g, '') : firstname;
    lastname = lastname ? lastname.toString().replace(/\s+/g, '') : lastname;
    telephone = telephone ? telephone.toString().replace(/\s+/g, '') : telephone;
    email = email ? email.toString().replace(/\s+/g, '') : email;

    return db.task('signup', db => db.users.findByEmail(email)
      .then((result) => {
        if (result) {
          return res.status(409).json({
            success: 'false',
            message: 'user with this email already exists',
          });
        }
        if (!telephone) {
          return db.users.createUser({ firstname, lastname, email, password, adminUser })
            .then((user) => {
              jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '24hrs' });
              return res.status(201).json({
                success: 'true',
                message: 'Account created successfully',
              });
            });
        }
        return db.users.findByTelephone(telephone)
          .then((found) => {
            if (found) {
              return res.status(409).json({
                success: 'false',
                message: 'user with this telephone already exists',
              });
            }
            return db.users.create({ firstname, lastname, email, telephone, password, adminUser })
              .then((user) => {
                jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '24hrs' });
                return res.status(201).json({
                  success: 'true',
                  message: 'Account created successfully',
                });
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

  /**
* @function login
* @memberof UserController
*
* @param {Object} req - this is a request object that contains whatever is requested for
* @param {Object} res - this is a response object to be sent after attending to a request
*
* @static
*/

  static login(req, res) {
    let { email } = req.body;
    const { password } = req.body;
    email = email && email.toString().trim();

    return db.task('signin', data => data.users.findByEmail(email)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            success: 'false',
            message: 'You have entered an invalid email or password',
          });
        }
        const allowEntry = bcrypt.compareSync(password, user.password);
        if (!allowEntry) {
          return res.status(401).json({
            success: 'false',
            message: 'You have entered an invalid email or password',
          });
        }
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '24hrs' });
        return res.status(200).json({
          success: 'true',
          message: 'Login was successful',
          token,
        });
      }))
      .catch((err) => {
        return res.status(500).json({
          success: 'false',
          message: 'unable to login, try again!',
          err: err.message,
        });
      });
  }
  /**
* @function updateUser
* @memberof UserController
*
* @param {Object} req - this is a request object that contains whatever is requested for
* @param {Object} res - this is a response object to be sent after attending to a request
*
* @static
*/

  static updateUser(req, res) {
    const { userId } = req;
    const id = parseInt(req.params.id, 10);
    let { firstname, lastname, email, telephone } = req.body;
    firstname = firstname ? firstname.toString().replace(/\s+/g, '') : firstname;
    lastname = lastname ? lastname.toString().replace(/\s+/g, '') : lastname;
    telephone = telephone ? telephone.toString().replace(/\s+/g, '') : telephone;
    email = email ? email.toString().replace(/\s+/g, '') : email;

    return db.task('user admin status', data => data.users.findById(id)
      .then((userFound) => {
        if (!userFound) {
          return res.status(401).json({
            success: 'false',
            message: 'User does not exist in the database',
          });
        }
        const owner = userFound.id === userId;

        const updateProfile = {
          firstname: firstname || firstname.userFound,
          lastname: lastname || lastname.userFound,
          email: email || email.userFound,
          telephone: telephone || telephone.userFound,
        };
        if (!owner) {
          return res.status(403).json({
            success: 'false',
            message: 'sorry, cannot modify an account that is not yours!',
          });
        }
        return db.users.modify(updateProfile, id)
          .then(() => {
            res.status(200).json({
              success: 'true',
              message: 'successful! your profile has been updated',
            });
          })
          .catch((err) => {
            return res.status(500).json({
              success: 'false',
              message: 'profile could not be modified',
              err: err.message,
            });
          });
      }))
      .catch((err) => {
        return res.status(500).json({
          success: 'false',
          message: 'oops! a problem occured, try again after a while',
          err: err.message,
        });
      });
  }
}

export default UserController;
