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
          return res.status(400).json({
            success: 'false',
            message: 'meal not found',
          });
        }
        const total = quantity * meal.price;
        return db.cart.create({ userId, foodId, quantity, total })
          .then(() => {
            return res.status(201).json({
              success: 'true',
              message: 'meal added to cart successfully',
            });
          })
          .catch(() => {
            return res.status(409).json({
              success: 'false',
              message: 'This food is already on the cart, you can modify the quantity on the cart',
            });
          })
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
* @function modifyCart
* @memberof OrderController
*
* @param {Object} req - this is a request object that contains whatever is requested for
* @param {Object} res - this is a response object to be sent after attending to a request
*
* @static
*/

  static modifyCart(req, res) {
    const { userId } = req;
    const id = parseInt(req.params.id, 10);
    const { quantity } = req.body;
    db.task('modify cart', data => data.cart.findById(id)
      .then((mealFound) => {
        if (!mealFound) {
          return res.status(400).json({
            success: 'false',
            message: 'cart item not found',
          });
        }
        if (userId !== mealFound.user_id) {
          return res.status(401).json({
            success: 'false',
            message: 'you are unauthorized to modify this cart',
          });
        }
        const foodId = mealFound.food_id;
        return db.menu.findById(foodId)
          .then((foodItem) => {
            const total = quantity * foodItem.price;
            const updateCart = {
              quantity,
              total,
            };
            return db.cart.modify(updateCart, id)
              .then(() => {
                res.status(200).json({
                  success: 'true',
                  message: 'successful! quantity has been updated',
                });
              });
          });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          success: 'false',
          message: 'so sorry, try again later',
          err: err.message,
        });
      }));
  }
  /**
* @function deleteCart
* @memberof OrderController
*
* @param {Object} req - this is a request object that contains whatever is requested for
* @param {Object} res - this is a response object to be sent after attending to a request
*
* @static
*/

  static deleteCart(req, res) {
    const { userId } = req;
    db.task('find food for user', data => data.cart.findByUserId(userId)
      .then((itemFound) => {
        if (!itemFound || itemFound.length === 0) {
          return res.status(401).json({
            success: 'false',
            message: 'nothing found on the cart',
          });
        }
        return db.cart.remove(userId);
      })
      .catch(() => {
        return res.status(500).json({
          success: 'true',
          message: 'deleted',
        });
      }));
  }
  /**
* @function getCart
* @memberof OrderController
*
* @param {Object} req - this is a request object that contains whatever is requested for
* @param {Object} res - this is a response object to be sent after attending to a request
*
* @static
*/

  static getCart(req, res) {
    const { userId } = req;
    db.task('add to cart', data => data.cart.findByUserId(userId)
      .then((meals) => {
        if (!meals || meals.length === 0) {
          return res.status(404).json({
            success: 'false',
            message: 'your cart list is empty, add an item to it',
          });
        }
        const cart = [];
        const foodItems = [...meals];
        foodItems.forEach((meal) => {
          const itemName = meal.item_name;
          const itemPrice = meal.price;
          const itemQuantity = meal.quantity;
          const itemTotal = meal.total;
          const food = {
            itemName,
            itemPrice,
            itemQuantity,
            itemTotal,
          };
          cart.push(food);
        });
        return res.status(200).json({
          success: 'true',
          cart,
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
    const status = 'New';
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
        return db.order.create({ userId, deliveryAddress, telephone, total, status })
          .then((order) => {
            const orderId = order.id;
            meals.forEach((meal) => {
              const foodId = meal.food_id;
              const quantity = meal.quantity;
              const totalPrice = meal.total;
              return db.foodOrdered.create({ userId, orderId, foodId, quantity, totalPrice })
                .then(() => {
                  db.none('DELETE FROM cart;');
                  return res.status(200).json({
                    success: 'true',
                    message: 'your order was successful',
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
  * @function orderHistory
  * @memberof OrderController
  *
  * @param {Object} req - this is a request object that contains whatever is requested for
  * @param {Object} res - this is a response object to be sent after attending to a request
  *
  * @static
  */

  static orderHistory(req, res) {
    const { userId } = req;
    const paramUserId = parseInt(req.params.id, 10);
    if (userId !== paramUserId) {
      return res.status(400).json({
        success: 'false',
        message: 'user unauthorized to get order history',
      });
    }
    return db.order.userOrderData(userId)
      .then((orders) => {
        const allOrders = [...orders];
        if (allOrders.length === 0) {
          return res.status(404).json({
            success: 'false',
            message: 'There are no pending orders in the database',
          });
        }
        return res.status(200).json({
          success: 'true',
          message: 'here goes your order history',
          allOrders,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: 'false',
          message: err.message,
        });
      });
  }
  /**
  * @function getOrders
  * @memberof OrderController
  *
  * @param {Object} req - this is a request object that contains whatever is requested for
  * @param {Object} res - this is a response object to be sent after attending to a request
  *
  * @static
  */

  static getOrders(req, res) {
    const { userId } = req;
    const publicUser = process.env.PUBLIC_USER;
    db.task('get orders', data => data.users.findById(userId)
      .then((user) => {
        if (user.admin_user == publicUser) {
          return res.status(401).json({
            success: 'false',
            message: 'user unauthorized to get all orders',
          });
        }
        return db.order.allData()
          .then((orders) => {
            const allOrders = [...orders];
            if (allOrders.length === 0) {
              return res.status(404).json({
                success: 'false',
                message: 'There are no pending orders in the database',
              });
            }
            return res.status(200).json({
              success: 'true',
              allOrders,
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
    return db.task('fetch user', data => data.users.findById(userId)
      .then((user) => {
        if (user.admin_user == publicUser) {
          return res.status(401).json({
            success: 'false',
            message: 'user unauthorized to get fetch an order',
          });
        }
        return db.order.findById(orderId)
          .then((order) => {
            if (!order && order.length === 0) {
              return res.status(404).json({
                success: 'false',
                message: 'This order does not exist',
              });
            }
            let grandTotal = 0;
            const itemsOnOrder = [];
            order.forEach((order) => {
              const itemName = order.item_name;
              const itemQuantity = order.quantity;
              const itemPrice = order.price;
              const total = order.total;
              grandTotal = order.total_price;
              itemsOnOrder.push({ itemName, itemPrice, itemQuantity, total });
            });
            return res.status(200).json({
              success: 'true',
              itemsOnOrder,
              grandTotal,
            });
          })
          .catch(() => {
            res.status(404).json({
              success: 'false',
              message: 'this ordered item does not exist',
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
  /**
* @function orderStatus
* @memberof OrderController
*
* @param {Object} req - this is a request object that contains whatever is requested for
* @param {Object} res - this is a response object to be sent after attending to a request
*
* @static
*/

  static orderStatus(req, res) {
    const { userId } = req;
    const orderId = parseInt(req.params.id, 10);
    let { orderStatus } = req.body;
    orderStatus = orderStatus && orderStatus
      .toLowerCase().toString().replace(/\s+/g, '');
    const publicUser = process.env.PUBLIC_USER;
    if (isNaN(orderId)) {
      return res.status(400).json({
        success: 'false',
        message: 'param should be a number not an alphabet',
      });
    }
    return db.task('fetch user', data => data.users.findById(userId)
      .then((user) => {
        if (user.admin_user === publicUser) {
          return res.status(401).json({
            success: 'false',
            message: 'user unauthorized to update status order',
          });
        }
        return db.order.findById(orderId)
          .then((order) => {
            order.order_status = orderStatus;
            if (!order) {
              return res.status(404).json({
                success: 'false',
                message: 'This order does not exist',
              });
            }
            const updatedStatus = {
              orderStatus: orderStatus || orderStatus.user,
            };
            return db.order.modify(updatedStatus, orderId)
              .then((result) => {
                res.status(200).json({
                  success: 'true',
                  message: 'successful! status modified by you',
                  orderStatus: result,
                });
              })
              .catch((err) => {
                return res.status(500).json({
                  success: 'false',
                  message: 'status could not be modified',
                  err: err.message,
                });
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
