const fs = require("fs");
const express = require("express");
const ProductManager = require("../ProductManager.js");
const handlebars = require("express-handlebars");
const productos = new ProductManager ("./productos.json");
const allProductsRouter = express.Router();
const uploader = require("../utils.js");

allProductsRouter.get("/", async (req,res)=> {
    try {
        const {products} = await productos.readJson();
     
      return  res.status(200).render("home",{products});
        /* const {products} = await productos.readJson();
        const limit = req.query.limit
        const limitedProducts = limit ? products.slice(0, limit) : products;
        res.status(200).json({
            status:"OK",
            msg:"product list",
            data:limitedProducts}) */
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ status: "error", msg: "Invalid input", data: {} })
        } else {
            res.status(500).json({ status: "error", msg: "Error in server", data: {} })
        }
    }

})

module.exports = allProductsRouter;