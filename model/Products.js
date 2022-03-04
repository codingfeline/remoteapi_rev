const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  path: {
    type: String
  },
  description: {
    type: String,
    maxlength: [1500, 'now that\'s a bit too much']
  },
  date: {
    type: Date,
    default: new Date()
  }
})

module.exports = mongoose.model('Products', productSchema)
// productName: {
//   type: String,
//   minlength: [6, 'you can do more than that'],
//   maxlength: [1500, 'now that\'s a bit too much']
// },

//############# from file object returned
// file {
//   fieldname: 'image',
//   originalname: '20191115_204028.jpg',
//   encoding: '7bit',
//   mimetype: 'image/jpeg',
//   destination: 'images',
//   filename: 'a95e46d3-b555-4860-ba5e-51a373873e6f-20191115_204028.jpg',
//   path: 'images\\a95e46d3-b555-4860-ba5e-51a373873e6f-20191115_204028.jpg',
//   size: 383327
// }