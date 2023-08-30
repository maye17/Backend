const express = require("express");
const userModel = require("../models/user.model.js");
const UserService = require("../services/user.service.js");
const isUser = require("../middlewares/authUser.js");
const isAdmin = require("../middlewares/authAdmin.js")

const passport = require('passport');
const CartControllers = require("../controllers/cart.controller.js");

const cartControllers = new CartControllers();
const authRouter = express.Router();

const userService = new UserService();
const authController = require("../controllers/auth.controller.js");


authRouter.get("/perfil",(req,res)=> {
   
    const user = { email: req.session.email, isAdmin: req.session.isAdmin };
    return res.render('perfil', { user: user });


})


authRouter.get("/administracion", (req,res)=> {
   
     
        return res.render('inicioAdmin');


})





//registro sin passport
/* authRouter.post("/login", async (req,res)=> {
    try {
  
        const { email, password} = req.body;
        if(!email || !password){
            return res.status(400).render('error',{error:'introduzca su email y password'})
        }
        const userEncontrado = await userService.AllUser({email:email})
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
  
}) */

//Con passport login

/* authRouter.post("/login",passport.authenticate('login', { failureRedirect: '/auth/faillogin' }), 
(req, res) => {
    console.log('req.user',req.user)
    if(!req.user) {
        return res.json({ status: 'error', msg: 'Error in login', payload: {} });

        }
        req.session.user = {
            _id:req.user._id,
            email:req.user.email,
            firstName:req.user.firstName,
            lastName:req.user.lastName,
            isAdmin:req.user.isAdmin,
            usuario:req.user.usuario,

        }

        cartControllers.createCart(req.user._id);
        
        return  res.redirect('/');
        //res.json({ status: 'success', msg: 'User logged', payload: req.user });
    });
 */


    //POST LOGIN 
    authRouter.get("/login", authController.renderLoginPage);

    authRouter.post("/login",
    passport.authenticate('login', { failureRedirect: '/auth/faillogin' }),
    authController.handleSuccessfulLogin
);



    authRouter.get('/faillogin', async (req, res) => {
        return res.json({ error: 'fail to login' });

        //debería ser para manejo de errores
        //return res.redirect("/errorlogin")
        });

   /*      authRouter.get("/login", async (req,res)=> {
            try {
                console.log('req.user',req.user)
             
                return res.render("login",{});
                
            } catch (error) {
                res.status(500).json({ 
                    status: "error",
                    msg: "Error en servidor", 
                    data: {} })
            }
        
        }) */
        

authRouter.get('/sesion', async (req, res) => {
    return res.send(JSON.stringify(req.session))
    });

//Con passport register
authRouter.post("/register",passport.authenticate('register', { failureRedirect: '/auth/failregister' }), async (req, res) => {
    if(!req.user) {
        return res.json({ status: 'error', msg: 'Error in register', payload: {} });
        }

        req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, isAdmin: req.user.isAdmin, usuario: req.user.usuario };

        return res.redirect('/perfil')
        //res.json({ msg: 'ok', payload: req.user });
    });


        
    authRouter.get('/failregister', async (req, res) => {
        return res.json({ error: 'fail to register' });
      });


    
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
    


    authRouter.get("/logout", async (req,res)=> {  
    req.session.destroy((err) => {
        if (err) {
            return res.json({ status: 'error', msg: 'Error in logout', payload: {} });
        }
        res.clearCookie('connect.sid');
        return res.redirect('/auth/login');
        });
})





module.exports = authRouter;