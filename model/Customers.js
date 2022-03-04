const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}
const optionalString = { type: String }

const contactSchema = mongoose.Schema({
  name: reqString,
  tel: optionalString,
  email: optionalString,
})

const methodInfoSchema = mongoose.Schema({
  methodName: reqString,
  username: reqString,
  password: reqString,
  url: reqString,
  notes: optionalString,
})

const devServSchema = mongoose.Schema({
  screenshot: optionalString,
  comment: optionalString,
  path: optionalString,
  fileName: optionalString,
})

const serverList = mongoose.Schema({
  name: optionalString,
  ip: optionalString,
  username: optionalString,
  password: optionalString,
  domain: reqString,
})

const devListSchema = mongoose.Schema({
  name: optionalString,
  ip: reqString,
  comment: optionalString,
})

const devPasswordSchema = mongoose.Schema({
  make: reqString,
  username: optionalString,
  password: optionalString,
})

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'you need to say something'],
    minlength: [4, 'you can do more than that'],
  },
  solution: reqString,
  contact: [contactSchema],
  methodInfo: [methodInfoSchema],
  server: [serverList],
  serverSetup: [devServSchema],
  deviceSetup: [devServSchema],
  deviceList: [devListSchema],
  devicePassword: [devPasswordSchema],
  otherNotes: optionalString,
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Customer', customerSchema)
// devicePassword: {
//   type: [devPasswordSchema],
//   validate: v => Array.isArray(v) && v.length > 0,
// },
