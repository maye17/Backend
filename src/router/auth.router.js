const fs = require("fs");
const express = require("express");
const authRouter = express.Router();
const userModel = require("../models/user.model.js");
const UserService = require("../services/user.service.js");
const isUser = require("../middlewares/authUser.js");
const isAdmin = require("../middlewares/authAdmin.js")
const userService = new UserService();


authRouter.get("/perfil", isUser,(req,res)=> {
   
    const user = { email: req.session.email, isAdmin: req.session.isAdmin };
    return res.render('perfil', { user: user });


})


authRouter.get("/administracion", isUser,isAdmin,(req,res)=> {
   
     
        return res.send('datos super secretos')


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
    try {
  
        const { email, password} = req.body;
        if(!email || !password){
            return res.status(400).render('error',{error:'introduzca su email y password'})
        }
        const userEncontrado = await userService.AllUser(email)
        if (userEncontrado && userService.authenticate(userEncontrado.password === password)) {
    
            console.log('datos del usuario', userEncontrado)
            req.session.email =userEncontrado.email;
            req.session.isAdmin = userEncontrado.isAdmin;
        
            return res.redirect('/auth/perfil');
        }else {
            return res.status(401).render('error', {error:'email o password erroneo!'})
        }

    } catch (error) {
        throw new Error(error.message)
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


authRouter.post("/register", async (req,res)=> {
    const {email,firstName,lastName,password} = req.body;
    if (!email || !password || !firstName || !lastName) {
        return res.status(400).render('error', { error: 'faltan datos!!' });
      }
    
    try {
    
         await userService.addUser(email,firstName,lastName,password);
         req.session.email = email;
         req.session.isAdmin = false;
        return res.status(200).redirect('/auth/perfil')
        

    } catch (error) {
        res.status(400).json({ 
            status: "error",
            msg: error.message, 
            payload: {} 
        })
    }

})


module.exports = authRouter;