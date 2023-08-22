const express = require('express');
const CartsController = require('../controllers/cartapi.controller');
const controllerCarts = new CartsController();


const cartsRouter = express.Router();

cartsRouter.get('/', controllerCarts.getCarts);


module.exports = cartsRouter;
