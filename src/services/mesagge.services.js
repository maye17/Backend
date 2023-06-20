const mensageMongoose = require ("../models/messages.model.js");

class MesaggeService {

    async addMesagge (mesaggeData){
        try {
            const product = await mensageMongoose.create(mesaggeData);
            return product;
      
        } catch (error) {
            throw error;
        }

}
}


module.exports = MesaggeService;
