const express = require('express');
const clientController = require('./../controllers/clientController');
const authController = require('./../controllers/authController');

const router = express.Router();
router
  .route('/')
  .get(
    authController.protect,
    clientController.getAllClients
  )
  .post(
    authController.protect,
    clientController.createClient
  );

router
  .route('/:id')
  .get(
    authController.protect,
    clientController.getClient
  )
  .patch(
    authController.protect,
    clientController.updateClient
  )
  .delete(
    authController.protect,
    clientController.deleteClient
  );

module.exports = router;
