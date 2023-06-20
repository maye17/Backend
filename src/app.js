const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const port =8080;
const productsRouter = require("./router/products.router.js");
const cartsRouter = require("./router/cart.router.js");
const { Server } = require("socket.io");
const allProductsRouter = require("./router/allproducts.js");
const realTimeProducts = require("./router/realtimeproducts.js");
/* const ProductManager = require("./dao/ProductManager.js");
const productos = new ProductManager ("productos.json"); */
const form = require('./router/form.router');
const connectMongo = require("./utils/mongo");
const chatRouter = require("./router/chat.router");
const ProductService = require("./services/product.services.js");
const productos = new ProductService();
/* const MesaggeService = require("./services/mesagge.services.js");
const msgs = new MesaggeService;
 */

const httpServer= app.listen(port,()=>{
    console.log(`server listening  http://localhost:${port}`);
})


connectMongo();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

app.engine('handlebars',handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "views");



// rutas api JSON
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// Rutas: HTML Render
app.use("/", allProductsRouter);
app.use("/formulario", form);
app.use('/chat', chatRouter)


//Rtuas: Sockets

app.use("/realTimeProducts", realTimeProducts)


//

let msgs =[]

const socketServer= new Server(httpServer);
socketServer.on("connection", (socket)=>{
/*     console.log("se abrio un canal de socket" + socket.id); */
    
/* socket.on("new-mesagge", async(
    msg)=>{
     
       await msgs.unshift(msg);
        console.log(msg);
        socketServer.emit("msg_back_to_front", msgs)
    })
 */
socket.on("msg_front_to_back", (msg) => {

    console.log(msg);
    msgs.unshift(msg);
    socketServer.emit("msg_back_to_front", msgs)
 }); 

    socket.on("new-Product",async(newProducts)=>{
        try {
            await productos.addProduct({...newProducts})
        
        const newProductList = await productos.getAllProducts();
        console.log('producto enviado',newProductList);
        socketServer.emit('products',{newProductList})
        } catch (error) {
            console.log(error);
        }
        
    })
    
});

app.get("*"), (req, res) => {
    return res.status(404).json({
        status: "error",
         msg: "Not Found", 
         data: {} })
}

 
// solicitando id del pedido
app.get(`/products/:pid`, async (req,res)=>{
    try {
        const idPedido = parseInt(req.params.pid) ;
    const idSolicitado = await newProductManger.getProductById(idPedido);
 //const idSolicitado = data.products.find((item)=> (item.id === idPedido))
    if(!idPedido){
        return res.json(newProductManger.getAllProducts())
    }
     if(idSolicitado){
        return res.json(idSolicitado);
     }else {
         return res.json({error:'El producto con el id: ' +  idPedido + ' no existe'})
        }} catch (error) {
            throw new Error(error.message)

    }
})

