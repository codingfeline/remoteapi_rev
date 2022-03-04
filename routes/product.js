const router = require('express').Router()
const helpers = require('../helpers/product')

const multer = require('multer')
const uuid = require('uuid').v4
// const app = require('express').express()

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, uuid() + '-' + file.originalname)
  },
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/gif'
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

router
  .route('/')
  .post(
    multer({ storage: fileStorage, fileFilter }).single('image'),
    helpers.createItem
  )

module.exports = router
