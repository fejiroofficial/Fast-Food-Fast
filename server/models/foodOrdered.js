/* eslint no-param-reassign: "off" */
/* eslint no-template-curly-in-string: "off" */
/* eslint max-len: "off" */

/** Class for interacting with the food_ordered data table. */
export default class FoodOrdered {
  /**
  * Class constructor.
  * @param {object} db - Object used to query the database.
  */
  constructor(db) {
    this.db = db;
  }
  /**
  * adds to order
  * @param {object} values - values gotten from the body of a request.
  */

  create(values) {
    const sql = 'INSERT INTO food_ordered (user_id, orders_id, food_id, quantity, total) VALUES(${userId}, ${orderId}, ${foodId}, ${quantity}, ${totalPrice}) RETURNING *';
    return this.db.one(sql, values);
  }
  /**
* Method for finding a user using the id.
* @param {number} id - the id of a user.
*/

  findByUserId(id) {
    const sql = 'SELECT * FROM food_ordered WHERE user_id = $1';
    return this.db.any(sql, id);
  }
  /**
* Method for finding a user using the id.
* @param {number} id - the id of a user.
*/

  findByOrderId(id) {
    const sql = 'SELECT * FROM food_ordered JOIN menu ON food_ordered.food_id = menu.id WHERE food_ordered.orders_id = $1';
    return this.db.any(sql, id);
  }
}
