const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL)
    .then(() =>{
        console.log(`Connected to MongoDB: ${mongoose.connection.name}`);
    }).catch((err) =>{
        console.log("MongoDB conn Error..",err);
    }) 

// module.exports = connectDB;