const fs = require("fs");
const express = require("express");
/* const ProductManager = require("../dao/ProductManager.js"); */
const handlebars = require("express-handlebars");
/* const productos = new ProductManager ("productos"); */
const productsRouter = express.Router();
const uploader = require("../utils/utils.js");
const ProductService = require('../services/product.services.js')
const productService = new ProductService();

productsRouter.get("/", async (req,res)=> {
    try {

       /*  const products = await productos.getProduct(); */

       const products = await productService.getAllProducts();
        const limit = req.query.limit
        const limitedProducts = limit ? products.slice(0, limit) : products;
        res.status(200).json({
            status:"OK",
            msg:"product list",
            payload:products,
        })
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ status: "error", msg: "Invalid input lectura todos", data: {} })
        } else {
            res.status(500).json({ status: "error", msg: "Error in server", data: {} })
        }
    }

})

productsRouter.get("/:pid", async (req, res) => {
    try {
        const id = req.params.pid
      /*   const dataId = await productos.getProductById(parseInt(id)); */

      const dataId = await productService.getProductById(parseInt(id))
        res.status(200).json(dataId)
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ status: "error", msg: "Invalid input lectura", data: {} })
        } else {
            res.status(500).json({ status: "error", msg: "Error in server", data: {} })
        }
    }
})


productsRouter.post("/", uploader.single("thumbnail"),  async (req, res) => {
    try {
       /*  const {products} = await productos.readJson(); */

    
        let newProduct = req.body;
        const createProduct = await productService(newProduct)
        newProduct.id = ((Math.random()*10000000).toFixed(0));
        newProduct.picture = "http://localhost:8080/" + req.file.filename;
      /*   let newProduct = req.body;
        let findproduct = (data.find((ele) => ele.code === newProduct.code)) */
        if (createProduct.find((item) => item.code === newProduct.code)) {
            return res.status(400).json({
                status: "error",
                msg: "Product already exists",
                data:{}
            })
        }
/*         const requiredField = ["title", "description", "code", "price", "stock", "category"]
        const allFields = requiredField.every(prop => newProduct[prop]);
        if (newProduct.id == undefined && allFields) {
            newProduct =
            {
                ...newProduct,
                id: data[data.length - 1].id + 1
            } */
             productos.addProduct(newProduct)
            return res.status(200).json({
                status: "Ok",
                msg: "Product added successfully",
                data: newProduct
            })
        /* } else {
            res.status(400).json({
                status: "error",
                msg: "Invalid input"
            }) */
        
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ status: "error", msg: "Invalid input datos", data: {} })
        } else {
            res.status(500).json({ status: "error", msg: "Error in server", data: {} })
        }
    }
})

productsRouter.put("/:pid",uploader.single("thumbnail"),  async   (req, res) => {
    try {
        const id = req.params.pid
       /*  const {products} = await productos.readJson() */

       const productos = await productService.getAllProducts();
        let changeProduct = req.body;
         productos.updateProduct(id, changeProduct);
        return res.status(201).json({
            status: "Ok",
            msg: "product updated",
            data: changeProduct
        })
    } catch {
        res.status(500).json({ status: "error", msg: "Invalid input", data: {} })
    }
})

productsRouter.delete("/:pid", uploader.single("thumbnail"), async  (req, res) => {
    try {
        const id = req.params.pid
        const {products} = await productos.readJson();
/*         let findProduct = data.find((prod) => prod.id == id) */
        if (products.find((prod) => prod.id === id)) {
            return  res.status(400).json({
                    status: "error",
                    msg: "Product not found"
            })
        } else {
             products.deleteProduct(id);
            return res.status(201).json({
                status: "Success",
                msg: "product deleted",
                data: {}
            })
        }
    } catch {
        res.status(400).json({ status: "error", msg: "Invalid input", data: {} })
    }
}
)

   
productsRouter.get("*", (req, res) => {
    res.status(404).json({ status: "error", msg: "Route not found", data: {} })
})



module.exports =  productsRouter;