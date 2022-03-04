const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'you need to say something'],
    minlength: [6, 'you can do more than that'],
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Order', orderSchema)