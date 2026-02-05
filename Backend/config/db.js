const mongoose = require('mongoose');

const connectDB = async ()=>{
    try{
        mongoose.connect(process.env.mongoURL);
        console.log("DB Connected");
    }
    catch(err){
        console.log(err.message);
        process.exit(1);
    }
};
module.exports = connectDB;