require('dotenv').config()
const User = require('../models/user')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({ message: 'All users ', data: users})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.getUserById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation error', errors: errors.array() });
    }

    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User found', data: user})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation error', errors: errors.array() });
    }

    try {
        const { username, email, password } = req.body;

        // Find the user by username or email
        const user = await User.findOne({ $or: [{ username }, { email }] });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }
        
        // Create a JWT token
        const tokenPayload = {
            id: user._id,
            username: user.username,
            role: user.username === 'admin' ? 'admin' : user.isAuthor ? 'author' : 'user',
            profile: {
                fullName: user.fullName,
                email: user.email,
                photoUrl: user.photoUrl,
                biography: user.biography,
                penName: user.penName,
                genres: user.genres
            }
        };
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            // secure: true, // Uncomment if using HTTPS
            // maxAge: 3600000, // Set cookie expiration time (1 hour in milliseconds)
        });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.logoutUser = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
    // res.redirect('/login');
};

module.exports.createUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation error', errors: errors.array() })
    }
    
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // Create a new user with the hashed password
        const newUser = new User({
            ...req.body,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User created', data: savedUser})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.updateUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation error', errors: errors.array() });
    }
    
    try {
        const updates = { ...req.body };
        if (req.body.password) {
            updates.password = await bcrypt.hash(req.body.password, 10);
        }

        const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated', data: user})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.deleteUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation error', errors: errors.array() });
    }

    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}