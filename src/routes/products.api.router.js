//@ts-check
const fs = require("fs");
const express = require("express");
/* const ProductManager = require("../dao/ProductManager.js"); */

/* const productos = new ProductManager ("productos"); */

const uploader = require("../utils/utils.js");

const ProductsController = require("../controllers/product.api.controller.js")

const productControllers = new ProductsController

const productsRouter = express.Router();

//obtiene todos los productos
productsRouter.get("/",productControllers.getAll);

//obtiene por id de producto
productsRouter.get("/:pid", productControllers.getById);
//post =crear un producto
productsRouter.post("/", productControllers.createOne);

//put = modifica un producto

productsRouter.put("/:pid", productControllers.updateOne);

//delete = elimina un producto

productsRouter.delete("/:id",productControllers.deleteOne);


module.exports =  productsRouter;