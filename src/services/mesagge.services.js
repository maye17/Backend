const mensageModel = require ("../models/messages.model.js");

class MesaggeService {

    async addMesagge (mesaggeData){
        try {
            const message = await mensageModel.create(mesaggeData);
            return message;
      
        } catch (error) {
            throw error;
        }

}
}


module.exports = MesaggeService;
