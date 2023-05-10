const express = require("express")
const app = express();
const port =3002;
const ProductManager = require('./ProductManager')
const newProductManger = new ProductManager()
const data = require ('../productos.json')



app.listen(port,()=>{
    console.log(`server listening  http//:localhost${port}`);
})

// respuesta al hacer un pedido a una función

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


// solicitando id del pedido
app.get(`/products/:pid`, async (req,res)=>{
    try {
        const idPedido = parseInt(req.params.pid) ;
    const idSolicitado = await newProductManger.getProductById(idPedido);
 /* const idSolicitado = data.products.find((item)=> (item.id === idPedido)) */
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

 
 
