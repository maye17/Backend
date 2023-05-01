const express = require("express")
const app = express();
const port =3002;
const ProductManager = require('./ProductManager')
const data = require ('../productos.json')



app.listen(port,()=>{
    console.log(`server listening  http//:localhost${port}`);
})

// respuesta al hacer un pedido a una función

app.get(`/products`, async (req,res)=>{
    const limit = parseInt(req.query.limit);
     const products = await data;
    const showProducts = limit ? products.slice(0,limit) :products;
    res.json(showProducts)
})


// solicitando id del pedido
app.get(`/products/:pid`, async (req,res)=>{
 const idPedido = parseInt(req.params.pid) ;

 const idSolicitado = data.products.find((item)=> (item.id === idPedido))
if(!idPedido){
    return res.json(data)
}
 if(idSolicitado){
    return res.json(idSolicitado);
 }else {
     return res.json({error:'El producto con el id: ' +  idPedido + ' no existe'})
 }
  
})

