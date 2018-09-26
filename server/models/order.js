/* eslint no-param-reassign: "off" */
/* eslint no-template-curly-in-string: "off" */
/* eslint max-len: "off" */

/** Class for interacting with the placed_order data table. */
export default class Order {
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
    const sql = 'INSERT INTO placed_order (user_id, delivery_address, telephone) VALUES(${userId}, ${deliveryAddress}, ${telephone}) RETURNING id';
    return this.db.one(sql, values);
  }
}
