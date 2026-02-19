const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB with timeout settings...");
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000,
        });

        console.log("MongoDB Connected");
    } catch (err) {
        console.error("MongoDB Connection Error:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
