const mongoose = require('mongoose')

const journalSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: [true, 'you need to say something'],
    minlength: [6, 'you can do more than that'],
  },
  topic: {
    type: String,
    required: true,
    minlength: [6, 'you can do more than that'],
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Journal', journalSchema)