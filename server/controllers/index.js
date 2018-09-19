import postOrder from './postOrder';
import updateStatus from './updateStatus';
import getAllOrders from './getAllOrders';
import fetchOrder from './fetchOrder';

/**
 * An object of functions
 * @constant
 *
 * @type {Object<Function>}
 * 
 * @exports orderCtrl
 * 
 */

const orderCtrl = {
  postOrder, updateStatus, getAllOrders, fetchOrder,
};

export default orderCtrl;
