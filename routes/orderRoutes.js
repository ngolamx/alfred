const express = require('express');
const orderController = require('./../controllers/orderController');
const authController = require('./../controllers/authController');

const router = express.Router();
router
  .route('/')
  .get(orderController.getAllOrders)
  .post(
    authController.protect,
    orderController.createOrder
  );

router
  .route('/:id')
  .get(orderController.getOrder)
  .patch(
    orderController.updateOrder
  )
  .delete(
    authController.protect,
    orderController.deleteOrder
  );

module.exports = router;
