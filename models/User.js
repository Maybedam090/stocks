const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  cash: { type: Number, default: 10000 },
  portfolio: { type: Array, default: [] },
  lastUpdate: { type: Date, default: Date.now },
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  progress: { type: ProgressSchema, default: () => ({}) },
});

module.exports = mongoose.model('User', UserSchema);
