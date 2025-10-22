const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware - Configure CORS to work with both localhost and Codespace
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://scaling-doodle-p77g6gg9rgf67pq-3000.app.github.dev'
    ];
    
    // Check if origin is in allowed list or matches GitHub Codespace pattern
    if (allowedOrigins.includes(origin) || origin.match(/^https:\/\/.*\.app\.github\.dev$/)) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

// MongoDB connection (using local MongoDB for now)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/halfbakery2';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    initializeDatabase();
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Import models
const Field = require('./models/Field');
const Category = require('./models/Category');
const Idea = require('./models/Idea');
const User = require('./models/User');

// Routes
app.get('/api/fields', async (req, res) => {
  try {
    const fields = await Field.find({ isActive: true }).sort({ order: 1 });
    res.json(fields);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/fields/:fieldId/recent-ideas', async (req, res) => {
  try {
    const { fieldId } = req.params;
    const ideas = await Idea.find({ fieldId, status: 'active' })
      .sort({ lastAnnotationAt: -1, createdAt: -1 })
      .limit(3)
      .populate('authorId', 'username');
    res.json(ideas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/ideas/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id)
      .populate('authorId', 'username')
      .populate('fieldId', 'name');
    if (!idea) {
      return res.status(404).json({ error: 'Idea not found' });
    }
    res.json(idea);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Flag an idea as MFD
app.post('/api/ideas/:id/flag-mfd', async (req, res) => {
  try {
    const { userId } = req.body; // In real app, this would come from authentication
    const idea = await Idea.findById(req.params.id);
    
    if (!idea) {
      return res.status(404).json({ error: 'Idea not found' });
    }
    
    // Check if user already flagged this idea
    if (idea.mfdFlaggedBy.includes(userId)) {
      return res.status(400).json({ error: 'User already flagged this idea' });
    }
    
    // Add flag
    idea.mfdFlags += 1;
    idea.mfdFlaggedBy.push(userId);
    
    // Auto-mark as MFD if enough flags (e.g., 3 flags)
    if (idea.mfdFlags >= 3 && idea.status === 'active') {
      idea.status = 'mfd';
    }
    
    await idea.save();
    res.json({ message: 'Idea flagged successfully', mfdFlags: idea.mfdFlags });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin endpoint: Get all flagged ideas
app.get('/api/admin/flagged-ideas', async (req, res) => {
  try {
    const flaggedIdeas = await Idea.find({ 
      $or: [
        { status: 'mfd' },
        { mfdFlags: { $gt: 0 } }
      ]
    })
      .populate('authorId', 'username')
      .populate('fieldId', 'name')
      .sort({ mfdFlags: -1, createdAt: -1 });
    
    res.json(flaggedIdeas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin endpoint: Process MFD flag (approve deletion, clear flags, or archive)
app.post('/api/admin/flagged-ideas/:id/action', async (req, res) => {
  try {
    const { action } = req.body; // 'delete', 'clear-flags', 'archive'
    const idea = await Idea.findById(req.params.id);
    
    if (!idea) {
      return res.status(404).json({ error: 'Idea not found' });
    }
    
    switch (action) {
      case 'delete':
        idea.status = 'deleted';
        break;
      case 'archive':
        idea.status = 'archived';
        break;
      case 'clear-flags':
        idea.mfdFlags = 0;
        idea.mfdFlaggedBy = [];
        if (idea.status === 'mfd') {
          idea.status = 'active';
        }
        break;
      default:
        return res.status(400).json({ error: 'Invalid action' });
    }
    
    await idea.save();
    res.json({ message: `Action '${action}' completed successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Initialize database with sample data
async function initializeDatabase() {
  try {
    // Check if data already exists
    const fieldCount = await Field.countDocuments();
    if (fieldCount > 0) {
      console.log('Database already initialized');
      return;
    }

    console.log('Initializing database with sample data...');

    // Create sample user
    const sampleUser = new User({
      username: 'halfbaker',
      email: 'halfbaker@example.com',
      role: 'user',
      bakingScore: 42
    });
    await sampleUser.save();

    // Load categories from JSON and create fields
    const categoriesData = require('../src/data/categories.json');
    
    for (const fieldData of categoriesData.fields) {
      const field = new Field({
        name: fieldData.name,
        slug: fieldData.slug,
        description: fieldData.description,
        order: fieldData.order,
        isActive: fieldData.isActive
      });
      await field.save();

      // Create sample ideas for each field (using the data from our homepage)
      const sampleIdeas = getSampleIdeasForField(fieldData.name);
      
      for (const ideaData of sampleIdeas) {
        const idea = new Idea({
          title: ideaData.title,
          description: `Description for: ${ideaData.title}`,
          summary: ideaData.title.substring(0, 100),
          authorId: sampleUser._id,
          fieldId: field._id,
          netScore: Math.floor(Math.random() * 20) - 5, // Random score between -5 and 15
          status: 'active',
          links: [],
          createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random date within last week
          lastAnnotationAt: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000) // Random recent activity
        });
        await idea.save();
      }
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Sample ideas from our homepage mockup
function getSampleIdeasForField(fieldName) {
  const ideasByField = {
    'Business': [
      { title: 'Radio/television numbering scheme with readings in style of Countdown', isUnread: false },
      { title: 'Gradually expiring vouchers', isUnread: true }
    ],
    'Computer': [
      { title: 'Luneburg microlens array', isUnread: true },
      { title: 'freeSearch', isUnread: false },
      { title: 'Shine phone', isUnread: true }
    ],
    'Fashion': [
      { title: 'villain barber kidnapping', isUnread: false },
      { title: 'Shoulder Ride Steering Hat', isUnread: true }
    ],
    'Food': [
      { title: 'Latte Foam Art Pendulum', isUnread: true }
    ],
    'Home': [
      { title: 'Pyrotronum', isUnread: false }
    ],
    'Other': [
      { title: 'Animal Commuter Trains', isUnread: true },
      { title: 'Doggy Disneyland', isUnread: false }
    ],
    'Product': [
      { title: 'Buzz Bomb Pipe Organ', isUnread: true },
      { title: 'Eyelights + retroreflective paint = efficiency', isUnread: false },
      { title: 'iPhone Book Disguise', isUnread: true }
    ],
    'Public': [
      { title: 'And This Year\'s Massive Hoax Was...', isUnread: false },
      { title: 'Standardized Homeless Fold Up Mobile Houses', isUnread: true },
      { title: 'Big Brother Is Watching You Stick On Security Camera Poster', isUnread: false }
    ],
    'Science': [
      { title: 'Nuclear Waste Disposal Thought Experiment', isUnread: true },
      { title: '1G Space Station', isUnread: false },
      { title: 'Male / Female Explosion Reaction Study', isUnread: true }
    ],
    'Sport': [
      { title: 'Million Dollar Per Round Mike Tyson Boxing Match Charity Event', isUnread: false },
      { title: 'Ballistic Curling', isUnread: true },
      { title: 'Coriolis Curling', isUnread: false }
    ],
    'Vehicle': [
      { title: 'Baseline Sobriety Test', isUnread: true },
      { title: 'EV Battery Heater', isUnread: false },
      { title: 'False North', isUnread: true }
    ]
  };

  return ideasByField[fieldName] || [];
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT} and listening on all interfaces`);
}).on('error', (err) => {
  console.error('Server error:', err);
});