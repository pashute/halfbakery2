const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  bakingScore: {
    type: Number,
    default: 0
  },
  readIdeas: [{
    ideaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Idea'
    },
    lastReadAt: {
      type: Date,
      default: Date.now
    }
  }],
  lastLoginAt: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);