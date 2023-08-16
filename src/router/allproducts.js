
const express = require("express");
const ProductManager = require("../dao/ProductManager.js");
const productos = new ProductManager ("productos");
const allProductsRouter = express.Router();

allProductsRouter.get("/home", async (req,res)=> {
    try {
        const products = await productos.getProduct();
         
      return  res.status(200).render('principal',{products});
        /* const {products} = await productos.readJson();
        const limit = req.query.limit
        const limitedProducts = limit ? products.slice(0, limit) : products;
        res.status(200).json({
            status:"OK",
            msg:"product list",
            data:limitedProducts}) */
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ status: "error", msg: "Invalid input allProductsRouter", data: {} })
        } else {
            res.status(500).json({ status: "error", msg: "Error in server", data: {} })
        }
    }

})

module.exports = allProductsRouter;