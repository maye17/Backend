const fs = require("fs");
const express = require("express");
const authRouter = express.Router();
const userModel = require("../models/user.model.js")

authRouter.get("/perfil", (req,res)=> {
   

        const user = {email: req.session.email, isAdmin: req.session.isAdmin};
        return res.render('perfil',{user:user})


})


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

    const {email,password} = req.body;
    const userEncontrado = await userModel.findOne({email:email})
    if(userEncontrado && userEncontrado.password == password) {
     /*    return res.send("logueado!!!") */
     req.session.email = userEncontrado.email;
     req.session.isAdmin = userEncontrado.isAdmin;
     return res.redirect('/auth/perfil');
    }else {
        return res.status(401).render('error', {error:'email o password erroneo!'})
    }
 

})

authRouter.get("/register", async (req,res)=> {
    try {
        
        return res.render("register",{})
    } catch (error) {
        res.status(500).json({ 
            status: "error",
            msg: "Error en servidor", 
            data: {} })
    }

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