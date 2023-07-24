const express = require ("express");
const chatRouter = express.Router();  
/* const MesaggeService = require("../services/mesagge.services")
const mesaggeService = new MesaggeService; */

chatRouter.get('/', async (req, res) => {
    try {
        return res.render('chat', {})
    } catch (error) {
        throw "Don't see of chat"
    }
    
})



/* 
chatRouter.post('/', async(req,res)=>{
    try {

        const mesaggeData =req.body;
        const createdChat = await mesaggeService.addMesagge(mesaggeData);
        return res.status(200).json({
            status:'success',
            msg:'mensaje creado',
            payload:createdChat
        })

    } catch (error) {
        throw error
    }
})
 */
module.exports = chatRouter;