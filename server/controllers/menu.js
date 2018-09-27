/* eslint no-shadow: "off" */
/* eslint max-len: "off" */
/* eslint arrow-body-style: "off" */
/* eslint linebreak-style: "off" */
/* eslint object-curly-newline: "off" */
/* eslint no-param-reassign: "off" */
/* eslint comma-dangle: "off" */

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
    let { itemName, price, foodUrl } = req.body;
    itemName = itemName ? itemName.toString().replace(/\s+/g, '') : itemName;
    price = price ? price.toString().replace(/\s+/g, '') : price;
    foodUrl = foodUrl ? foodUrl.toString().replace(/\s+/g, '') : foodUrl;

    const publicUser = process.env.PUBLIC_USER;
    db.task('find user', data => data.users.findById(userId)
      .then((user) => {
        if (user.admin_user == publicUser) {
          return res.status(401).json({
            success: 'false',
            message: 'user unauthorized to add a meal',
          });
        }
        return db.task('post meal', data => data.menu.findByName(itemName)
          .then((foodFound) => {
            if (foodFound) {
              return res.status(409).json({
                success: 'false',
                message: 'this meal already exists in the database',
              });
            }
            return db.menu.create({ itemName, price, foodUrl })
              .then(() => {
                return res.status(201).json({
                  success: 'true',
                  message: 'meal has been added in successfully',
                });
              });
          })
        );
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
  /**
* @function deleteMenu
* @memberof MenuController
*
* @param {Object} req - this is a request object that contains whatever is requested for
* @param {Object} res - this is a response object to be sent after attending to a request
*
* @static
*/

  static deleteFoodFromMenu(req, res) {
    const { userId } = req;
    const foodId = parseInt(req.params.id, 10);

    const publicUser = process.env.PUBLIC_USER;
    db.task('find user', data => data.users.findById(userId)
      .then((user) => {
        if (user.admin_user == publicUser) {
          return res.status(401).json({
            success: 'false',
            message: 'user unauthorized to delete a meal',
          });
        }
        return db.task('post meal', data => data.menu.findById(foodId)
          .then((mealFound) => {
            if (!mealFound) {
              return res.status(400).json({
                success: 'false',
                message: 'this food does not exist on the food menu',
              });
            }
            return db.menu.remove(foodId)
              .then(() => {
                return res.status(200).json({
                  success: 'true',
                  message: 'meal has been deleted successfully',
                });
              });
          })
        );
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
* @function modifyMenu
* @memberof MenuController
*
* @param {Object} req - this is a request object that contains whatever is requested for
* @param {Object} res - this is a response object to be sent after attending to a request
*
* @static
*/

  static modifyFoodOnMenu(req, res) {
    const { userId } = req;
    const foodId = parseInt(req.params.id, 10);
    let { itemName, price, foodUrl } = req.body;
    itemName = itemName ? itemName.toString().replace(/\s+/g, '') : itemName;
    price = price ? price.toString().replace(/\s+/g, '') : price;
    foodUrl = foodUrl ? foodUrl.toString().replace(/\s+/g, '') : foodUrl;

    const publicUser = process.env.PUBLIC_USER;
    db.task('find user', data => data.users.findById(userId)
      .then((user) => {
        if (user.admin_user == publicUser) {
          return res.status(401).json({
            success: 'false',
            message: 'user unauthorized to modify food on menu',
          });
        }
        return db.task('post meal', data => data.menu.findById(foodId)
          .then((mealFound) => {
            if (!mealFound) {
              return res.status(400).json({
                success: 'false',
                message: 'this food does not exist on the food menu',
              });
            }
            const updateFood = {
              itemName: itemName || itemName.mealFound,
              price: price || price.mealFound,
              foodUrl: foodUrl || foodUrl.mealFound,
            };
            return db.menu.modify(updateFood, foodId)
              .then(() => {
                return res.status(200).json({
                  success: 'true',
                  message: 'meal has been modified successfully',
                });
              })
              .catch(() => {
                return res.status(400).json({
                  success: 'false',
                  message: 'this food already exists somewhere on your menu',
                });
              })
          })
        );
      })
      .catch((err) => {
        return res.status(500).json({
          success: 'false',
          message: 'so sorry, try again later',
          err: err.message,
        });
      }));
  }
}
export default MenuController;
