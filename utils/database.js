const mongoose = require("mongoose");
require('dotenv').config();

let isConnected = false;

async function connectToDB(uri = process.env.MONGODB_URI || "") {
    mongoose.set("strictQuery", true);

    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }

    try {
        await mongoose.connect(uri, {
            dbName: "node-auth",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = true;

        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectToDB;


