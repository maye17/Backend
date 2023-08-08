const messagesModel = require("../models/messages.model.js");


class MesaggeService {

    async getMessage (){
        try {
            
            const dataMessage =  messagesModel.find(message)
            return dataMessage

        } catch (error) {
            
        }
    }

    async addMesagge (newMessage){
        try {
            const message = await messagesModel.create(newMessage);
            console.log("probando si se guarda",message)
            return message;
      
        } catch (error) {
            throw error;
        }

}
}


module.exports = MesaggeService;
