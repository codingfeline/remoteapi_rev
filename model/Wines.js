const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
    min: 6,
    max: 1500
  },
  description: {
    type: String,
    min: 6,
    max: 1024,
  },
  price1: {
    type: Number,
  },
  price2: {
    type: Number,
  },
  price3: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Wines', userSchema)