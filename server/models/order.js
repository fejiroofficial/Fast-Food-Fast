/* eslint no-param-reassign: "off" */
/* eslint no-template-curly-in-string: "off" */
/* eslint max-len: "off" */
/* eslint linebreak-style: "off" */

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
    const sql = 'INSERT INTO orders (user_id, delivery_address, telephone, total_price, order_status) VALUES(${userId}, ${deliveryAddress}, ${telephone}, ${total}, ${status}) RETURNING id';
    return this.db.one(sql, values);
  }
  /** Method for getting all orders in the database. */

  allData() {
    const sql = 'SELECT * FROM orders';
    return this.db.many(sql);
  }
  /**  Method for getting order history for a user */

  userOrderData(id) {
    const sql = 'SELECT  orders.id, menu.item_name, orders.total_price, orders.order_time FROM orders JOIN food_ordered ON orders.id = food_ordered.orders_id JOIN menu ON food_ordered.food_id = menu.id WHERE orders.user_id = $1 ORDER BY orders.order_time DESC';
    return this.db.many(sql, id);
  }
  /**
  * Method for finding an order using the id.
  * @param {number} id - the id of a order.
  */

  findById(id) {
    const sql = 'SELECT * FROM orders LEFT JOIN food_ordered ON orders.id = food_ordered.orders_id LEFT JOIN menu ON food_ordered.food_id = menu.id WHERE orders.id = $1';
    return this.db.many(sql, id);
  }

  /**
* Method for modifying order status.
* @param {number} id - the id of a user.
*/

  modify(values, id) {
    values.orderId = id;
    const sql = 'UPDATE orders SET order_status=${orderStatus} WHERE id=${orderId} RETURNING *';
    return this.db.one(sql, values);
  }
}
