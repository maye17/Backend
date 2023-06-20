const express = require ("express");
const chatRouter = express.Router();  
const MesaggeService = require("../services/mesagge.services")
const mesagge = new MesaggeService;

chatRouter.get('/', async (req, res) => {
    try {
        return res.render('chat', {})
    } catch (error) {
        throw "Don't see of chat"
    }
    
})

module.exports = chatRouter;