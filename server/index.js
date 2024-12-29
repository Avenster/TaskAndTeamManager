const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Initialize express and load environment variables
dotenv.config();
const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Dynamic import for node-fetch
const fetch = (...args) => 
  import('node-fetch').then(({default: fetch}) => fetch(...args));

// Constants
const PORT = process.env.PORT || 5000;
const CLIENT_ID = "Ov23liblcsy9A9MU6zSC";
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

/************************* Database Configuration *************************/
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

/************************* Schema Definitions *************************/
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

/************************* Middleware Functions *************************/
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

/************************* Authentication Routes *************************/
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

    // Check existing user
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash password and create user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    const savedUser = await user.save();
    
    // Generate JWT
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

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Email or password is incorrect' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Email or password is incorrect' });
    }

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

/************************* Protected Routes *************************/
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.user.id });
});

app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

/************************* GitHub OAuth Routes *************************/
app.get('/getAccessToken', async function (req, res) {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: req.query.code
  });
  
  try {
    const response = await fetch(`https://github.com/login/oauth/access_token?${params.toString()}`, {
      method: "POST",
      headers: {
        "Accept": "application/json"
      }
    });
    
    const data = await response.json();
    if (data.error) {
      console.log(data);
      return res.status(400).json(data);
    }
    
    res.json(data);
  } catch (error) {
    console.error('Error fetching access token:', error);
    res.status(500).json({ error: 'Failed to fetch access token' });
  }
});

app.get('/getUserData', async function (req, res) {
  const token = req.query.access_token || req.headers.authorization.split(' ')[1];
  
  try {
    const response = await fetch("https://api.github.com/user", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      }
    });
    
    const data = await response.json();
    
    if (response.status !== 200) {
      return res.status(response.status).json(data);
    }
    
    const jwtToken = jwt.sign(
      { id: data.id, provider: 'github' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token: jwtToken,
      user: {
        id: data.id,
        username: data.login,
        email: data.email,
        avatar_url: data.avatar_url,
        name: data.name,
        provider: 'github'
      }
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

/************************* Server Initialization *************************/
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));