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
    const sql = 'INSERT INTO food_ordered (user_id, placed_order_id, food_item, unit_price, quantity, total) VALUES(${userId}, ${orderId}, ${foodItem}, ${unitPrice}, ${quantity}, ${totalPrice}) RETURNING *';
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
}
