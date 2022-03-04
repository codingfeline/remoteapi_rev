const mongoose = require('mongoose')

const planSchema = new mongoose.Schema({
  activity: {
    type: String,
    required: [true, 'you need to say something'],
    minlength: [6, 'you can do more than that'],
    maxlength: [1500, 'now that\'s a bit too much']
  },
  destination: {
    type: String,
    required: true,
    minlength: [6, 'you can do more than that'],
    maxlength: [1500, 'now that\'s a bit too much']
  },
  date: {
    type: Date,
    required: [true, 'you should know when']
  }
})

module.exports = mongoose.model('Plan', planSchema)