const mongoose = require('mongoose');

const taskList = new mongoose.Schema({
  task: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
  },
  status: {
    type: Boolean,
  },
  user_id: {
    //type: mongoose.Schema.Types.ObjectId,
    type: Number,
    required: true
    //ref: 'users',
  },
});

module.exports = mongoose.model('taskList', taskList);
