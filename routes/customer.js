const router = require('express').Router()
const verify = require('./verifyToken')
const helpers = require('../helpers/customer')
const multer = require('multer')
const uuid = require('uuid').v4

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/screenshots')
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

router.route('/').get(helpers.getAllItems).post(helpers.createItem)

router
  .route('/:itemId')
  .get(helpers.getOneItem)
  .put(helpers.updateItem)
  .delete(verify, helpers.deleteItem)

router.route('/:itemId/insertOneMethod').put(helpers.insertOneMethod)
router.route('/:itemId/updateMethodInfo').put(helpers.updateMethodInfo)
router.route('/:itemId/insertOneDevicePassword').put(helpers.insertOneDevicePassword)
router.route('/:itemId/updateOneDevicePassword').put(helpers.updateOneDevicePassword)
router.route('/:itemId/insertOneServer').put(helpers.insertOneServer)
router.route('/:itemId/updateOneServer').put(helpers.updateOneServer)
router.route('/:itemId/insertOneServerSetup').put(helpers.insertOneServerSetup)
router.route('/:itemId/updateOneServerSetup').put(helpers.updateOneServerSetup)
router.route('/:itemId/insertOneContact').put(helpers.insertOneContact)
router.route('/:itemId/updateOneContact').put(helpers.updateOneContact)

router
  .route('/:itemId/insertOneServerSetup2')
  .put(
    multer({ storage: fileStorage, fileFilter }).single('image'),
    helpers.insertOneServerSetup2
  )

// router
//   .route('/:itemId/insertOneServerSetup')
//   .post(
//     multer({ storage: fileStorage, fileFilter }).single('image'),
//     helpers.insertOneServerSetup
//   )

module.exports = router
