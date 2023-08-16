//@ts-check
const {Server} = require("socket.io");
const ProductService = require("../services/product.services.js");
const messagesModel = require("../models/messages.model.js");
const productos = new ProductService();



const socketConnect = (httpServer) => {

const socketServer= new Server(httpServer);
socketServer.on("connection", (socket)=>{
    console.log("se abrio un canal de socket" + socket.id);


      //------------ CHAT---------------
    socket.on("msg_front_to_back", async (msg) => {
        try {
          await messagesModel.create(msg);
        } catch (e) {
          console.log(e);
        }
        try {
          const msgs = await messagesModel.find({});
          socketServer.emit("listado_de_msgs", msgs);
        } catch (e) {
          console.log(e);
        }
      });



//--------Usuario desconectado-------------

 socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });

//-----------Porducto nuevo ----------------
    socket.on("new-Product",async(newProducts)=>{
        try {
            await productos.addProduct({...newProducts})
        
        const newProductList = await productos.getAllProducts();
        console.log('producto enviado',newProductList);
        socketServer.emit('products',{newProductList})
        } catch (error) {
            console.log(error);
        }
        
    });
    

    //------------Actualizar producto
    socket.on("update-Product",async(id, updateProduct)=>{
        try {
            await productos.updateProduct({_id:id,...updateProduct})
            if (!updateProduct) {
                // Manejar si el producto no se encuentra
                return;
              }
        
              // Envía la actualización al frontend a través del socket
        const updateProductList = await productos.getAllProducts(updateProduct.id);
        console.log('producto modificado',updateProductList);
        socketServer.emit('products',{updateProductList})
        } catch (error) {
            console.log(error);
        }
        
    });
    
    socket.on("delete-Product",async(productId)=>{
        try {
           const deleteProductList = await productos.deleteProduct(productId);

           if (!deleteProductList) {
            // Manejar si el producto no se encuentra
            return console.log('producto no encontrado');

           }

          // console.log('producto eliminado',productId);
           socketServer.emit('product Deleted',{msg:"mandar desde el back al front"})
        } catch (error) {
            console.log(error);
        }
        
    });
    

})


}
module. exports = socketConnect;