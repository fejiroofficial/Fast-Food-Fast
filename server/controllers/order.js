/* eslint no-shadow: "off" */
/* eslint max-len: "off" */
/* eslint arrow-body-style: "off" */
/* eslint linebreak-style: "off" */
/* eslint object-curly-newline: "off" */
/* eslint no-template-curly-in-string: "off" */
/* eslint no-param-reassign: "off" */

import db from '../db';

/** food order controller class */
class OrderController {
  /**
* @function addToCart
* @memberof OrderController
*
* @param {Object} req - this is a request object that contains whatever is requested for
* @param {Object} res - this is a response object to be sent after attending to a request
*
* @static
*/

  static addToCart(req, res) {
    const { userId } = req;
    let { foodId, quantity } = req.body;
    foodId = foodId ? foodId.toString().replace(/\s+/g, '') : foodId;
    quantity = quantity ? quantity.toString().replace(/\s+/g, '') : quantity;

    db.task('add to cart', data => data.menu.findById(foodId)
      .then((meal) => {
        if (!meal) {
          return res.status(404).json({
            success: 'false',
            message: 'meal not found',
          });
        }
        const total = quantity * meal.price;
        const itemName = meal.item_name;
        const unitPrice = meal.price;
        const mealItem = {
          userId,
          foodId,
          itemName,
          unitPrice,
          quantity,
          total,
        };
        return db.cart.create({ userId, foodId, unitPrice, quantity, total })
          .then(() => {
            return res.status(201).json({
              success: 'true',
              message: 'meal added to cart successfully',
              cart: mealItem,
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
* @function orderFood
* @memberof OrderController
*
* @param {Object} req - this is a request object that contains whatever is requested for
* @param {Object} res - this is a response object to be sent after attending to a request
*
* @static
*/

  static orderFood(req, res) {
    const { userId } = req;
    let { deliveryAddress, telephone } = req.body;
    deliveryAddress = deliveryAddress ? deliveryAddress.toString().replace(/\s+/g, '') : deliveryAddress;
    telephone = telephone ? telephone.toString().replace(/\s+/g, '') : telephone;

    db.task('post order', data => data.cart.findByUserId(userId)
      .then((meals) => {
        if (!meals || meals.length === 0) {
          return res.status(404).json({
            success: 'false',
            message: 'your cart list is empty, add an item to it',
          });
        }
        let total = 0;
        meals.forEach((meal) => {
          total += parseInt(meal.total, 10);
        });
        return db.order.create({ userId, deliveryAddress, telephone, total })
          .then((order) => {
            const orderId = order.id;
            meals.forEach((meal) => {
              const foodItem = meal.item_name;
              const unitPrice = meal.unit_price;
              const quantity = meal.quantity;
              const totalPrice = meal.total;
              const foodOrder = {
                userId,
                orderId,
                deliveryAddress,
                total,
              };
              return db.foodOrdered.create({ userId, orderId, foodItem, unitPrice, quantity, totalPrice })
                .then(() => {
                  db.none('DELETE FROM cart;');
                  return res.status(200).json({
                    success: 'true',
                    message: 'your order was successful',
                    foodOrder,
                  });
                });
            });
          })
          .catch((err) => {
            db.none('DELETE FROM placed_order WHERE id = ${order.id}');
            return res.status(500).json({
              success: 'false',
              message: 'so sorry, something went wrong, try again',
              err: err.message,
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
  * @function getOrder
  * @memberof OrderController
  *
  * @param {Object} req - this is a request object that contains whatever is requested for
  * @param {Object} res - this is a response object to be sent after attending to a request
  *
  * @static
  */

  static getOrder(req, res) {
    const { userId } = req;
    const orderId = parseInt(req.params.id, 10);
    const publicUser = process.env.PUBLIC_USER;
    if (isNaN(orderId)) {
      return res.status(400).json({
        success: 'false',
        message: 'param should be a number not an alphabet',
      });
    }
    return db.task('fetch an order', data => data.users.findById(userId)
      .then((user) => {
        if (user.admin_user === publicUser) {
          return res.status(401).json({
            success: 'false',
            message: 'user unauthorized to get fetch an order',
          });
        }
        return db.order.findById(orderId)
          .then((order) => {
            if (!order) {
              return res.status(404).json({
                success: 'false',
                message: 'This order does not exist',
              });
            }
            return res.status(200).json({
              success: 'true',
              order,
            });
          });
      })
      .catch((err) => {
        res.status(500).json({
          success: 'false',
          message: err.message,
        });
      }));
  }
}

export default OrderController;
