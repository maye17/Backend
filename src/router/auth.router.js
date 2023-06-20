const fs = require("fs");
const express = require("express");
const authRouter = express.Router();


authRouter.get("/login", async (req,res)=> {
    try {
        
        return res.render("login",{})
    } catch (error) {
        res.status(500).json({ 
            status: "error",
            msg: "Error en servidor", 
            data: {} })
    }

})


authRouter.post("/login", async (req,res)=> {
    console.log(req.body.email);
    console.log(req.body.password);
    res.send("mirar la consola")

})



/* authRouter.post("/register", async (req,res)=> {
    try {

        console.log(req.body.email);
        console.log(req.body.password);
        res.send("mirar la consola")


    } catch (error) {
        res.status(500).json({ 
            status: "error",
            msg: "Error en servidor", 
            data: {} })
    }

})
 */

module.exports = authRouter;