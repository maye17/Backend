const CartService = require('../services/cart.service.js')
const cartService = new CartService()

class CartControllers {

    async  getAllCart(req,res){

            try {
                const pedido = await cartService.getAllCart();
                return res.status(200).json({
                    status:"success",
                    msg:"Exitoso",
                    payload:pedido
                })

     
            } catch (error) {
                throw error;
            }

    }
/*     createCart(){

    }
    updateCart(){

    }
    deleteCart(){

    } */
}


 module.exports = CartControllers;