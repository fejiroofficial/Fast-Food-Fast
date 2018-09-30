/* eslint no-param-reassign: "off" */
/* eslint no-template-curly-in-string: "off" */
/* eslint max-len: "off" */
/* eslint linebreak-style: "off" */

/** Class for interacting with the food menu data table. */
export default class Menu {
  /**
  * Class constructor.
  * @param {object} db - Object used to query the database.
  */
  constructor(db) {
    this.db = db;
  }
  /**
  * Create a new menu.
  * @param {object} values - values gotten from the body of a request.
  */

  create(values) {
    const sql = 'INSERT INTO menu (item_name, price, food_url) VALUES(${itemName}, ${price}, ${foodUrl}) RETURNING *';
    return this.db.one(sql, values);
  }
  /**
  * Method for finding a food menu using the id.
  * @param {number} id - the id of a food.
  */

  findById(id) {
    const sql = 'SELECT * FROM menu WHERE id = $1';
    return this.db.oneOrNone(sql, id);
  }
  /**
* Method for finding a food menu using the id.
* @param {number} id - the id of a food.
*/

  findByName(itemName) {
    const sql = 'SELECT * FROM menu WHERE item_name = $1';
    return this.db.oneOrNone(sql, itemName);
  }
  /**
  * Method for removing a food menu from the database using the id.
  * @param {number} id - the id of a food.
  */

  remove(id) {
    const sql = 'DELETE FROM menu WHERE id = $1';
    return this.db.one(sql, id);
  }

  /** Method for getting all food menu in the database. */

  allData() {
    const sql = 'SELECT * FROM menu';
    return this.db.many(sql);
  }
  /**
* Method for modifying items on menu.
* @param {number} id - the id of a user.
*/

  modify(values, id) {
    values.id = id;
    const sql = 'UPDATE menu SET item_name=${itemName}, price=${price}, food_url=${foodUrl} WHERE id=${id} RETURNING *';
    return this.db.one(sql, values);
  }
  /**
* Method for modifying items on menu if menu item name already exists.
* @param {number} id - the id of a user.
*/

modifyPriceUrl(values, id) {
  values.id = id;
  const sql = 'UPDATE menu SET price=${price}, food_url=${foodUrl} WHERE id=${id} RETURNING *';
  return this.db.one(sql, values);
}
}
