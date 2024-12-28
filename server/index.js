// server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    minLength: 3
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true,
    minLength: 6
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};


// Check username availability
app.post('/api/check-username', async (req, res) => {
  try {
    const { username } = req.body;
    const existingUser = await User.findOne({ username });
    res.json({ isAvailable: !existingUser });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Register new user
app.post('/api/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    const savedUser = await user.save();
    
    // Create and assign JWT
    const token = jwt.sign(
      { id: savedUser._id }, 
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ 
      token,
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login user
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Email or password is incorrect' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Email or password is incorrect' });
    }

    // Create and assign token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
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
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Protected route example
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.user.id });
});
app.get('/api/auth/github/callback', async (req, res) => {
  const { code } = req.query;

  try {
    // Exchange code for access token
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Get user data from GitHub
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const githubUser = userResponse.data;

    // Get user's email from GitHub
    const emailsResponse = await axios.get('https://api.github.com/user/emails', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const primaryEmail = emailsResponse.data.find(email => email.primary).email;

    // Find or create user
    let user = await User.findOne({ githubId: githubUser.id });

    if (!user) {
      // Check if user exists with the same email
      user = await User.findOne({ email: primaryEmail });
      
      if (user) {
        // Link GitHub to existing account
        user.githubId = githubUser.id;
        user.avatarUrl = githubUser.avatar_url;
        await user.save();
      } else {
        // Create new user
        user = new User({
          username: githubUser.login,
          email: primaryEmail,
          githubId: githubUser.id,
          avatarUrl: githubUser.avatar_url,
        });
        await user.save();
      }
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/auth-callback?token=${token}`);
  } catch (error) {
    console.error('GitHub OAuth error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/auth-callback?error=Authentication failed`);
  }
});

// Additional route to get user profile with GitHub data
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));