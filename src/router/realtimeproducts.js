const fs = require("fs");
const express = require("express");
const ProductManager = require("../dao/ProductManager.js");
const handlebars = require("express-handlebars");
const productos = new ProductManager ("./productos.json");
const realTimeProducts = express.Router();
const uploader = require("../utils/utils.js");

realTimeProducts.get("/", async (req,res)=> {

    try {
    
        const products = await productos.getProduct();

        
      return  res.status(200).render("realTimeProducts",{products});
  
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ status: "error", msg: "Invalid input", data: {} })
        } else {
            res.status(500).json({ status: "error", msg: "Error in server", data: {} })
        }
    }

})

module.exports = realTimeProducts;