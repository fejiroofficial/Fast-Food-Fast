import express from 'express';
import orderCtrl from '../controllers';
import middlewares from '../middlewares';

const router = express.Router();

router.route('/orders')
  .post(middlewares.validatePostOrder, orderCtrl.postOrder);

export default router;
