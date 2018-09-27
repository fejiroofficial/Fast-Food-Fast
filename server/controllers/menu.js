/* eslint no-shadow: "off" */
/* eslint max-len: "off" */
/* eslint arrow-body-style: "off" */
/* eslint linebreak-style: "off" */
/* eslint object-curly-newline: "off" */
/* eslint no-param-reassign: "off" */

import db from '../db';

/** food menu controller class */
class MenuController {
  /**
* @function postMeal
* @memberof MenuController
*
* @param {Object} req - this is a request object that contains whatever is requested for
* @param {Object} res - this is a response object to be sent after attending to a request
*
* @static
*/

  static postMeal(req, res) {
    const { userId } = req;
    let { itemName, price, foodImage } = req.body;
    itemName = itemName ? itemName.toString().replace(/\s+/g, '') : itemName;
    price = price ? price.toString().replace(/\s+/g, '') : price;
    foodImage = foodImage ? foodImage.toString().replace(/\s+/g, '') : foodImage;

    const newMeal = {
      itemName,
      price,
      foodImage,
    };
    const publicUser = process.env.PUBLIC_USER;
    db.task('post meal', data => data.users.findById(userId)
      .then((user) => {
        if (user.admin_user == publicUser) {
          return res.status(401).json({
            success: 'false',
            message: 'user unauthorized to add a meal',
          });
        }
        return db.menu.create({ itemName, price, foodImage })
          .then(() => {
            return res.status(201).json({
              success: 'true',
              message: 'meal has been added in successfully',
              food: newMeal,
            });
          });
      })
      .catch((err) => {
        return res.status(500).json({
          success: 'false',
          message: 'so sorry, try again later',
          err: err.message,
        });
      }));
  }
  /**
* @function getMenu
* @memberof MenuController
*
* @param {Object} req - this is a request object that contains whatever is requested for
* @param {Object} res - this is a response object to be sent after attending to a request
*
* @static
*/

  static getMenu(req, res) {
    db.task('all food menu', db => db.menu.allData()
      .then((menu) => {
        const allMenu = [...menu];
        return res.status(200).json({
          success: 'true',
          menu: allMenu,
        });
      })
      .catch((err) => {
        res.status(404).json({
          success: 'false',
          message: 'nothing found in the database',
          err: err.message,
        });
      }));
  }
}
export default MenuController;
