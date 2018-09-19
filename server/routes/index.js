import express from 'express';
import orderCtrl from '../controllers';
import middlewares from '../middlewares';

const router = express.Router();

router.route('/orders')
  .post(middlewares.validatePostOrder, orderCtrl.postOrder)
  .get(orderCtrl.getAllOrders);

router.route('/orders/:id')
  .put(middlewares.validateUpdateStatus, orderCtrl.updateStatus)
  .get(orderCtrl.fetchOrder);
  
export default router;
