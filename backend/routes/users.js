const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// register new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'username or email already exists' });
    }

    // create new user
    const user = new User({ username, email, password });
    await user.save();

    // generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'work4u-secret-key-463f761f',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// login user
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'invalid creds' });
    }

    // check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'invalid creds' });
    }

    // generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'work4u-secret-key-463f761f',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// logout user
router.post('/logout', auth, (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// get user profile (protected route)
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// update user profile (protected route)
router.put('/profile', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { profile: req.body.profile },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router; 