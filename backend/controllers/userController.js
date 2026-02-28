const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @desc    Get all users
// @route   GET /api/users
// @access  Public (should be Admin protected in a real app)
exports.getUsers = async (req, res) => {
    try {
        const { role } = req.query;
        let query = {};

        if (role) {
            query.role = role;
        }

        const users = await User.find(query).select('-password').sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (err) {
        console.error("Error in getUsers:", err);
        res.status(500).json({ message: "Server Error fetching users" });
    }
};

// @desc    Create a new user (Student or Teacher)
// @route   POST /api/users
// @access  Public (should be Admin protected in a real app)
exports.createUser = async (req, res) => {
    try {
        const { fullName, email, password, role, ...additionalFields } = req.body;

        // Check required fields
        if (!fullName || !email || !password || !role) {
            return res.status(400).json({ message: "Please provide all required fields (fullName, email, password, role)" });
        }

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        // Users created by admin are automatically verified
        user = new User({
            fullName,
            email,
            password: hashedPassword,
            role,
            isVerified: true,
            // Depending on the model, we could store additional fields here if we modify the User schema
            // Currently User schema doesn't have fields for practicalsCompleted, rollNo, etc.
            // We might need to add them, but for now we follow the existing schema.
        });

        await user.save();

        // Return user without password
        const userWithoutPassword = await User.findById(user._id).select('-password');

        res.status(201).json(userWithoutPassword);
    } catch (err) {
        console.error("Error in createUser:", err);
        res.status(500).json({ message: "Server Error creating user", error: err.message });
    }
};

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Public (should be Admin protected in a real app)
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Use deleteOne instead of remove
        await User.deleteOne({ _id: req.params.id });
        res.status(200).json({ id: req.params.id, message: 'User removed' });
    } catch (err) {
        console.error("Error in deleteUser:", err);
        res.status(500).json({ message: "Server Error deleting user" });
    }
};

// @desc    Update a user
// @route   PUT /api/users/:id
// @access  Public (should be Admin protected in a real app)
exports.updateUser = async (req, res) => {
    try {
        const { fullName, email, role, password } = req.body;

        let user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields
        if (fullName) user.fullName = fullName;
        if (email) user.email = email;
        if (role) user.role = role;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();

        const updatedUser = await User.findById(req.params.id).select('-password');
        res.status(200).json(updatedUser);
    } catch (err) {
        console.error("Error in updateUser:", err);
        res.status(500).json({ message: "Server Error updating user" });
    }
};
