require('dotenv').config();
const mongoose = require('mongoose');

console.log("Testing MongoDB Connection...");
console.log(`URI: ${process.env.MONGO_URI ? "Defined (Hidden)" : "Undefined"}`);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected Successfully!");
        process.exit(0);
    })
    .catch((err) => {
        console.error("❌ Connection Failed:");
        console.error("Name:", err.name);
        console.error("Message:", err.message);
        console.error("Code:", err.code);
        console.error("Full Error:", err);
        process.exit(1);
    });
