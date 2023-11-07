const mongoose = require('mongoose');

const taskList = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  status: {
    type: Boolean,
  },
  user_id: {
    //type: mongoose.Schema.Types.ObjectId,
    required: true,
    type: Number
    //ref: 'users'
  },

});

module.exports = mongoose.model('taskLists', taskList);
