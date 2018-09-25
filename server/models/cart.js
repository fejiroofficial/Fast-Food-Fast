/* eslint no-param-reassign: "off" */
/* eslint no-template-curly-in-string: "off" */
/* eslint max-len: "off" */

/** Class for interacting with the cart data table. */
export default class Cart {
  /**
  * Class constructor.
  * @param {object} db - Object used to query the database.
  */
  constructor(db) {
    this.db = db;
  }
  /**
  * adds to cart
  * @param {object} values - values gotten from the body of a request.
  */

  create(values) {
    const sql = 'INSERT INTO cart (user_id, food_id, item_name, quantity, total) VALUES(${userId}, ${foodId}, ${itemName}, ${quantity}, ${total}) RETURNING *';
    return this.db.one(sql, values);
  }
  /**
* Method for finding a user using the id.
* @param {number} id - the id of a user.
*/

  findByUserId(id) {
    const sql = 'SELECT * FROM cart WHERE user_id = $1';
    return this.db.any(sql, id);
  }
}
