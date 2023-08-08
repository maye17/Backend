//@ts-check
const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const port =8080;
const productsRouter = require("./router/products.router.js");
const cartsRouter = require("./router/cart.router.js");
const { Server } = require("socket.io");
const allProductsRouter = require("./router/allproducts.js");
const realTimeProducts = require("./router/realtimeproducts.js");
const authRouter = require("./router/auth.router.js")
const sessionsRouter = require("./router/sessions.router.js");
const loginRouter = require("./router/login.router.js");
/* const ProductManager = require("./dao/ProductManager.js");
const productos = new ProductManager ("productos.json"); */
const form = require('./router/form.router');
const connectMongo = require("./utils/mongo");
const principalRouter = require("./router/principal.router.js");
const chatRouter = require("./router/chat.router");
const iniPassport = require("../src/config/passport.config.js");
const passport = require("passport");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const  socketServer = require("./utils/socketConnect.js");
const ProductService = require("./services/product.services.js");
const productos = new ProductService();


const httpServer= app.listen(port,()=>{
    console.log(`server listening  http://localhost:${port}`);
})


socketServer(httpServer);


connectMongo();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

app.engine('handlebars',handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "views");

// session

app.use(
    session({
      store: MongoStore.create({ mongoUrl: 'mongodb+srv://maye_17:Z43IROGnWaS5mLn0@ecommerce.dhbbfye.mongodb.net/ecommerce?retryWrites=true&w=majority', ttl: 7200 }),
      secret: 'un-re-secreto',
      resave: true,
      saveUninitialized: true,
    })
  );
//TODO LO DE PASSPORT
iniPassport();
app.use(passport.initialize());
app.use(passport.session());

// rutas api JSON
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// Rutas: HTML Render
app.use("/", allProductsRouter);
app.use("/formulario", form);
app.use('/chat', chatRouter)
app.use('/auth', authRouter )

app.use('/api/sessions', sessionsRouter);
//No usar solo prueba
/* app.use('/', loginRouter); */


//Rutas: Sockets

app.use("/realTimeProducts", realTimeProducts)
app.use("/", principalRouter)


//


app.get("*"), (req, res) => {
    return res.status(404).json({
        status: "error",
         msg: "Not Found", 
         data: {} 
        })
}

 
// solicitando id del pedido
app.get(`/products/:pid`, async (req,res)=>{
    try {
        const idPedido = parseInt(req.params.pid) ;
    const idSolicitado = await productos.getProductById(idPedido);
 //const idSolicitado = data.products.find((item)=> (item.id === idPedido))
    if(!idPedido){
        return res.json(productos.getAllProducts())
    }
     if(idSolicitado){
        return res.json(idSolicitado);
     }else {
         return res.json({error:'El producto con el id: ' +  idPedido + ' no existe'})
        }} catch (error) {
            throw new Error(error.message)
    }
})
