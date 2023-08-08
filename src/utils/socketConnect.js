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
    
})
}
module. exports = socketConnect;