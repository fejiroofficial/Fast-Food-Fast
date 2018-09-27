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
    const sql = 'INSERT INTO cart (user_id, food_id, quantity, total) VALUES(${userId}, ${foodId}, ${quantity}, ${total}) RETURNING *';
    return this.db.one(sql, values);
  }
  /**
* Method for finding a food on menu using the id.
* @param {number} id - the id of a cart item.
*/

  findById(id) {
    const sql = 'SELECT * FROM cart WHERE id = $1';
    return this.db.oneOrNone(sql, id);
  }
  /**
* Method for finding a food on menu using userId.
* @param {number} id - the id of a user.
*/

  findByUserId(id) {
    const sql = 'SELECT * FROM cart JOIN menu ON cart.food_id = menu.id WHERE cart.user_id = $1';
    return this.db.any(sql, id);
  }
  /**
  * Method for removing items from the cart.
  * @param {number} id - the id of a user.
  */

  remove(id) {
    const sql = 'DELETE FROM cart WHERE user_id = $1 RETURNING *';
    return this.db.one(sql, id);
  }
  /**
* Method for modifying cart information.
* @param {number} id - the id of a food.
*/

  modify(values, id) {
    values.id = id;
    const sql = 'UPDATE cart SET quantity=${quantity}, total=${total} WHERE id=${id} RETURNING *';
    return this.db.one(sql, values);
  }
}
