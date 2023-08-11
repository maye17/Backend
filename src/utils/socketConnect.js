//@ts-check
const {Server} = require("socket.io");
const messageService = require("../services/message.services.js");
const MesaggeService = new messageService();

const ProductService = require("../services/product.services.js");
const productos = new ProductService();



const socketConnect = (httpServer) => {

    let msgs =[];

const socketServer= new Server(httpServer);
socketServer.on("connection", (socket)=>{
    console.log("se abrio un canal de socket" + socket.id);
    
socket.on("new-message", async (
    newMessage)=>{
     
       try {
     
 /*        console.log('mensaje recibido', newMessage);
        //Guardando mensaje
        const message = MesaggeService.addMesagge({newMessage: newMessage.msgs, user: newMessage.user});
        await message.save();
        console.log('mensaje guardado', message);
        //enviando mensaje
        socketServer.emit('message',newMessage)
        console.log(newMessage)
 */
        
       await MesaggeService.addMesagge({...newMessage})

         socketServer.emit('message',newMessage)
          console.log(newMessage) 
       } catch (error) {
        throw error   
       }

    })

socket.on("msg_front_to_back", (msg) => {

    console.log(msg);
    msgs.unshift(msg);
    socketServer.emit("msg_back_to_front", msgs)
 }); 


 socket.on('disconnect', () => {
    console.log('Usuario desconectado');
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
        
    });
    
    socket.on("update-Product",async(updateProduct)=>{
        try {
            await productos.updateProduct({...updateProduct})
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