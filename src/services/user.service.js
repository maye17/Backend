const usersModel = require("../models/user.model")
const hashPassword = require("../utils/hashPassword")



class UserService {

    async AllUser (){
        
        const {email} = usersModel;
        try {
            

            const dataUser =  usersModel.findOne({email})
            return dataUser

        } catch (error) {
            throw ("ERROR",error)
        }
    }


async AllPassword (){

    const {password} = usersModel;
    try {
        const hashedPassword = await hashPassword(password);
        const storedHashedPassword = hashedPassword;
        const isPasswordValid = await validatePassword(password, storedHashedPassword);
    
        return isPasswordValid
        
    } catch (error) {
        throw error
    }
 
}

 /*    async addUser (userData){
        try {
            const user = await usersModel.create(userData);
            return user;

        } catch (error) {
            throw error;
        }
    } */

    async addUser (email,firstName,lastName,password){
       
   
        try {


            const user = await usersModel.create({email:email,password:await hashPassword(password), firstName:firstName,lastName:lastName,isAdmin:false} )
            return user;
            }
         catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;