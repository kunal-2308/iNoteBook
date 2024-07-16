const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost:27017/inotebook?directConnection=true';

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connection successful!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

module.exports = connectToMongo;
