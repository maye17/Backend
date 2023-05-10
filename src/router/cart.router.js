const express = require ("express");
const productManager = require("./../ProductManager");
const CartManager = require("./ CartManager");
const ProductManager = require("./../ProductManager");

const products = new ProductManager("../../productos.json");
const carts = new CartManager("../../carts.json")
const cartRouter = express.Router();

cartRouter.get("/", (req,res)=> {
    try {
        return res.status(200).json({
            status:"success",
            msg:"Exitoso",
            data:products
        })
    } catch (error) {
        if(error instanceof  error){
            res.status(400).json({
            status:"error",
            msg:"Error en ingreso", data:{}})
        }else {
            res.status(500).json({
            status:"error",
            msg:"Error en servidor", data:{}})
        }
    }
 
})


cartRouter.get("/:cid",  (req, res) => {
    try {
        const dataCarts =  carts.getCarts()
        const id = req.params.cid
        const dataId =  carts.getCartById(parseInt(id));
        if (dataId) {
            res.status(200).json(dataId)
        } else {
            res.status(200).json(`No existe el carrito id: ${id}`)
        }
    } catch {
        res.status(500).json({ 
            status: "error", 
            msg: "Error en servidor", 
            data: {} })
    }
})

cartRouter.post("/:cid/products/:pid", (req,res)=>{
    try {
        const newCart=  carts.getCarts();
        const dataProducts = products.getProducts()
        const cartId = req.params.cid
        const productId = req.params.pid
        const cartFound = dataCarts.find((item) => item.id == cartId)
        if (!cartFound) {
            res.status(200).json(`No existe el carrito id: ${cartId}`)
        }
        const productFound = dataProducts.find((item) => item.id == parseInt(productId))
        if (!productFound) {
            res.status(200).json(`No existe el producto id: ${productId}`)
        }
        const product =  carts.updateCart(parseInt(cartId), parseInt(productId))
        res.status(200).json(product)
    } catch {
        res.status(500).json({ 
            status: "error",
            msg: "Error en servidor", 
            data: {} })
    }
})
    
cartRouter.get("*", (req, res) => {
    res.status(404).json({ 
        status: "error",
        msg: "Route not found",
        data: {} })
})



module.exports =  cartRouter;