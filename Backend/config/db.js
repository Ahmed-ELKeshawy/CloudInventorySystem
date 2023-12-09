const mongoose = require('mongoose');



const intiateDBConnection = async () => {
    try{
        console.log("entered the initializing")
        await mongoose.connect(String(process.env.uri));
        console.log('connected to Mongo DataBase server');
        console.log("its working dumbass");

    } catch(error){
        console.log(error);
    }
};

module.exports = intiateDBConnection;