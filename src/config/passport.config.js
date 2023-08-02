const passport = require('passport');
const passportGithub = require('passport-github');
const GitHubStrategy = passportGithub.Strategy;
const User = require('../models/user.model.js');
const UserService = require('../services/user.service.js');

const userService = new UserService();

passport.use(
    new GitHubStrategy(
        {
            clientID: 'Iv1.0df6c35ddb8fa72e',
            clientSecret: 'aacd7c060daf343c79d3d5c18fbd65c854e9ce98',
            callbackURL: 'http://localhost:8080/api/sessions/githubcallback',
        },
        async (accessToken, _, profile, done) => {
            try {

                const res = await fetch('https://api.github.com/user/emails', {
                    headers: {
                        Accept: 'application/vnd.github.v3+json',
                        Authorization: `token ${accessToken}`,
                    }
                }); 

                const emails = await res.json();
                const primaryEmail = emails.find(e => e.verifed==true);

                if(!primaryEmail){
                    return done(new error('No se pudo obtener el email del usuario'));
                }
                profile.emails = primaryEmail.email;
                const user = await userService.findOne({email:profile.emails});
                if (!user) {

                    const newUser = {
                        email:profile.emails,
                        firstName:profile._json.name || profile._json.login || 'noname',
                        lastName:"nolastname",
                        isAdmin:false,
                        password:"nopassword",
                    }  
                    let userCreated = await userService.addUser(newUser);
                    console.log("usuario registrado con exito",userCreated)
                    return done(null, userCreated);
                } else {
                    console.log("usuario logueado",user)
                    return done(null, user);
                }
                
            } catch (error) {
                console.log('error con github')
                return done(error);
            }
        }
    )
);


passport.serializeUser((user, done) => {
    done(null, user._id);
}   );

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userService.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
}   );

module.exports = passport;

