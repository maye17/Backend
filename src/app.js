const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const port =8080;
const data = require ('../productos.json');
const productsRouter = require("./router/products.router");
const cartsRouter = require("./router/cart.router.js")

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

app.engine('handlebars',handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "views");




app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


app.get("*"), (req, res) => {
    return res.status(404).json({
        status: "error",
         msg: "Not Found", 
         data: {} })
}


app.listen(port,()=>{
    console.log(`server listening  http://localhost:${port}`);
})

// respuesta al hacer un pedido a una función
/* 
app.get(`/products`, async (req,res)=>{
    try {
        
        const limit = parseInt(req.query.limit);
        const newProducts =  await newProductManger.getProduct();
       const showProducts = limit ? newProducts.slice(0, limit) :newProducts;
       res.json(showProducts)
    } catch (error) {
        throw new Error(error.message)
    }   
});
 */

// solicitando id del pedido
/* app.get(`/products/:pid`, async (req,res)=>{
    try {
        const idPedido = parseInt(req.params.pid) ;
    const idSolicitado = await newProductManger.getProductById(idPedido);
 /* const idSolicitado = data.products.find((item)=> (item.id === idPedido)) */
/*     if(!idPedido){
        return res.json(newProductManger.readJson())
    }
     if(idSolicitado){
        return res.json(idSolicitado);
     }else {
         return res.json({error:'El producto con el id: ' +  idPedido + ' no existe'})
        }} catch (error) {
            throw new Error(error.message)

    }
})  */

 
 
// solicitando id del pedido
app.get(`/products/:pid`, async (req,res)=>{
    try {
        const idPedido = parseInt(req.params.pid) ;
    const idSolicitado = await newProductManger.getProductById(idPedido);
 //const idSolicitado = data.products.find((item)=> (item.id === idPedido))
    if(!idPedido){
        return res.json(newProductManger.readJson())
    }
     if(idSolicitado){
        return res.json(idSolicitado);
     }else {
         return res.json({error:'El producto con el id: ' +  idPedido + ' no existe'})
        }} catch (error) {
            throw new Error(error.message)

    }
})

