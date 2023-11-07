const mongoose = require('mongoose');

const taskList = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required:false
  },
  status: {
    type: Boolean,
    required:false
  },
  user_id: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('tasklists', taskList);
