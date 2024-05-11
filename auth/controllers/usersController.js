require('dotenv').config();
const User = require('../models/user');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const UserVerification = require('../models/userVerification');

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: 'All users ', data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getUserById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: 'Validation error', errors: errors.array() });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User found', data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: 'Validation error', errors: errors.array() });
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
      role:
        user.username === 'admin' ? 'admin' : user.isAuthor ? 'author' : 'user',
      profile: {
        fullName: user.fullName,
        email: user.email,
        photoUrl: user.photoUrl,
        biography: user.biography,
        penName: user.penName,
        genres: user.genres,
      },
    };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.cookie('token', token, {
      httpOnly: true,
      // secure: true, // Uncomment if using HTTPS
      // maxAge: 3600000, // Set cookie expiration time (1 hour in milliseconds)
    });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.logoutUser = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
  // res.redirect('/login');
};

module.exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: 'Validation error', errors: errors.array() });
  }

  try {
    const { username, email } = req.body;
    const existingUser = await User.findOne({ username, email});
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // Create a new user with the hashed password
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: 'Validation error', errors: errors.array() });
  }

  try {
    const updates = { ...req.body };
    if (req.body.password) {
      updates.password = await bcrypt.hash(req.body.password, 10);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated', data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: 'Validation error', errors: errors.array() });
  }

  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function sendVerificationEmail(user) {
  const { email, username } = user;
  const currentUrl = `${req.protocol}://${req.get('host')}`;
  const uniqueString = uuidv4() + username;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: 'Email Verification',
    html: `<p>Verify your email address to complete the signup and login into your account.</p>
    <p>This link <b>expires in 6 hours</b>. Please verify your email before it expires.</p>
    <p>Click <a href="${currentUrl}verify-email/${uniqueString}">here</a> to proceed.</p>`
  }

  try {
    const hashedUniqueString = await bcrypt.hash(uniqueString, 10);
    const newVerification = new UserVerification({
      email,
      uniqueString: hashedUniqueString,
      createdAt: Date.now(),
      expiresAt: Date.now() + 6 * 60 * 60 * 1000,
    });

    await newVerification.save();

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Verification email sent' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports.verifyEmail = async (req, res) => {
  const { username, uniqueString } = req.params;

  try {
    const userVerification = await UserVerification.findOne({ username })

    if (!userVerification) {
      return res.status(404).json({ message: "Account record doesn't exist or has been verified already" });
    }

    if (userVerification.expiresAt < Date.now()) {
      await UserVerification.deleteOne({ username });
      return res.status(400).json({ message: 'Verification link has expired' });
    }

    const isMatch = await bcrypt.compare(uniqueString, userVerification.uniqueString);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid verification link' });
    }

    await User.updateOne({ username }, { active: true });
    await UserVerification.deleteOne({ username });
    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports.resendVerificationEmail = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    sendVerificationEmail(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
