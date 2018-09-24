/* eslint no-param-reassign: "off" */
/* eslint no-template-curly-in-string: "off" */
/* eslint max-len: "off" */

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
    const sql = 'INSERT INTO food_menu (item_name, price, food_image) VALUES(${itemName}, ${price}, ${foodImage}) RETURNING *';
    return this.db.one(sql, values);
  }
  /**
  * Method for finding a food menu using the id.
  * @param {number} id - the id of a food.
  */

  findById(id) {
    const sql = 'SELECT * FROM food_menu WHERE id = $1';
    return this.db.oneOrNone(sql, id);
  }
  /**
  * Method for removing a food menu from the database using the id.
  * @param {number} id - the id of a food.
  */

  remove(id) {
    const sql = 'DELETE FROM food_menu WHERE id = $1';
    return this.db.one(sql, id);
  }
  /** Method for getting all food menu in the database. */

  allData() {
    const sql = 'SELECT * FROM food_menu';
    return this.db.many(sql);
  }
}
