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
  title: optionalString,
})

const scanEmailSchema = mongoose.Schema({
  hostname: reqString,
  username: optionalString,
  password: optionalString,
  port: reqString,
})

const scanFolderSchema = mongoose.Schema({
  hostname: reqString,
  folder: optionalString,
  username: reqString,
  password: reqString,
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

const serverSchema = mongoose.Schema({
  name: optionalString,
  ip: optionalString,
  username: optionalString,
  password: optionalString,
  internet: { type: Boolean, default: false },
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

const networkSchema = mongoose.Schema({
  name: optionalString,
  domain: reqString,
  dns: optionalString,
})

const solutionSchema = mongoose.Schema({
  name: optionalString,
  portal: optionalString,
  username: optionalString,
  password: optionalString,
})

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'you need to say something'],
    minlength: [4, 'you can do more than that'],
  },
  solution: optionalString,
  solutionInfo: [solutionSchema],
  contact: [contactSchema],
  methodInfo: [methodInfoSchema],
  server: [serverSchema],
  serverSetup: [devServSchema],
  deviceSetup: [devServSchema],
  deviceList: [devListSchema],
  devicePassword: [devPasswordSchema],
  network: [networkSchema],
  scanEmail: [scanEmailSchema],
  scanFolder: [scanFolderSchema],
  otherNotes: [reqString],
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
