const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const createTestUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const email = "test.student@mmmut.ac.in";
        const password = "password123";
        const fullName = "Test Student";

        let user = await User.findOne({ email });

        if (user) {
            console.log("Test user already exists. Updating password and verification status...");
            user.password = await bcrypt.hash(password, 10);
            user.isVerified = true;
            await user.save();
            console.log("Test user updated.");
        } else {
            console.log("Creating test user...");
            const hashedPassword = await bcrypt.hash(password, 10);
            user = new User({
                fullName,
                email,
                password: hashedPassword,
                role: "student",
                isVerified: true
            });
            await user.save();
            console.log("Test user created.");
        }

        process.exit(0);
    } catch (error) {
        console.error("Error creating test user:", error);
        process.exit(1);
    }
};

createTestUser();
