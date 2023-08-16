//@ts-check
const fs = require("fs");
const express = require("express");
/* const ProductManager = require("../dao/ProductManager.js"); */

/* const productos = new ProductManager ("productos"); */

const uploader = require("../utils/utils.js");
/* const ProductService = require('../services/product.services.js');
const productsService = new ProductService();
 */
const ProductsController = require("../controller/product.controller.js")

const productControllers = new ProductsController

const productsRouter = express.Router();

//obtiene todos los productos
productsRouter.get("/",productControllers.getAll);

//obtiene por id de producto
productsRouter.get("/:id", productControllers.getById);
//post =crear un producto
productsRouter.post("/", productControllers.createOne);

//put = modifica un producto

productsRouter.put("/:pid", productControllers.updateOne);

//delete = elimina un producto

productsRouter.delete("/:id",productControllers.deleteOne);


/* productsRouter.get("/", async (req,res)=> {
    try {

       //  const products = await productos.getProduct(); 
       const products = await productsService.getAllProducts();
       console.log(products);
      //   const limit = req.query.limit
        //const limitedProducts = limit ? products.slice(0, limit) : products; 
      return  res.status(200).json({
            status:"OK",
            msg:"product list",
            payload:products,
        })
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ status: "error", msg: "Invalid input lectura todos", data: {} })
        } else {
            res.status(500).json({ status: "error", msg: "Error in server", payload: {} })
        }
    }

})
 */
/* productsRouter.get("/:pid", async (req, res) => {
    try {
        const id = req.params.pid
    
      const dataId = await productsService.getProductById(parseInt(id))
        res.status(200).json(dataId)
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ status: "error", msg: "Invalid input lectura", data: {} })
        } else {
            res.status(500).json({ status: "error", msg: "Error in server", payload: {} })
        }
    }
})
 */
/* 
productsRouter.post("/", uploader.single("thumbnail"),  async (req, res) => {
    try {
    
        
        let newProduct = req.body;
        const createProduct = await productsService.addProduct(newProduct)
        newProduct.id = ((Math.random()*10000000).toFixed(0));
        newProduct.picture = "http://localhost:8080/" + req.file.filename;
 
        if (createProduct.find((item) => item.code === newProduct.code)) {
            return res.status(400).json({
                status: "error",
                msg: "Product already exists",
                payload:{}
            })
        }

            productsService.addProduct(newProduct)
            return res.status(200).json({
                status: "Ok",
                msg: "Product added successfully",
                payload: newProduct
            })
     
        
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ status: "error", msg: "Invalid input datos", data: {} })
        } else {
            res.status(500).json({ status: "error", msg: "Error in server", payload: {} })
        }
    }
}) */

/* productsRouter.post("/", async (req,res) => {
    try {
        const productData = req.body;
        const createdProduct = await productsService.addProduct(productData);
        return res.status(201).json({
            status: 'success',
            msg: 'Product created',
            payload: createdProduct,
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            status: 'error',
            msg: error.message,
            payload:{}
        });
    }
});




productsRouter.put("/:pid",uploader.single("thumbnail"),  async   (req, res) => {
    try {
        const id = req.params.pid

       const productos = await productsService.getAllProducts();
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
        const productId = req.params.id;
        const deletedProduct = await productsService.deleteProduct(productId);
        if (!deletedProduct) {
            return res.status(404).json({
                status: 'error',
                msg: 'Product not found',
            });
        }
        return res.status(200).json({
            status: 'success',
            msg: 'Product deleted',
            payload: deletedProduct,
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
        status: 'error',
        msg: error.message,
        });
    }
})

   
productsRouter.get("*", (req, res) => {
    res.status(404).json({ status: "error", msg: "Route not found", data: {} })
})
 */


module.exports =  productsRouter;