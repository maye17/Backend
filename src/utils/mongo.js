const mongoose  = require('mongoose');

const connectMongo = async ()=>{
    try {
        
        await mongoose.connect (
            "mongodb+srv://maye_17:Z43IROGnWaS5mLn0@ecommerce.dhbbfye.mongodb.net/?retryWrites=true&w=majority"
            
        );
    /*     console.log(db.connection.host); */

        console.log("plug to mongo!");

    } catch (error) {
        console.log(error);
        throw "can not connect to the db";
        
    }

}

module.exports = connectMongo ;