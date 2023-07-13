const usersModel = require("../models/user.model")

class UserService {
    async addUser (userData){
        try {
            const user = await usersModel.create(userData);
            return user;

        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;