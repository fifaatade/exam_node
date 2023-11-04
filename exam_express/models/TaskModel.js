const mongoose = require('mongoose');

const taskList = new mongoose.Schema({
  task: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'completed'],
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  },
});

module.exports = mongoose.model('taskList', taskList);
