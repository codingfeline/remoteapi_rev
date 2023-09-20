const router = require('express').Router()
const verify = require('./verifyToken')
const helpers = require('../helpers/customer')
const inserts = require('../helpers/inserts')
const findOnes = require('../helpers/findOne')
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

router.route('/').get(helpers.getAllItems).post(helpers.create)
router.route('/nameId').get(helpers.getNameId)

// FIND ONES
router.route('/:itemId/:methodId/findMethod').get(findOnes.findMethod)
router.route('/:itemId/:contactId/findContact').get(findOnes.findContact)
router.route('/:itemId/:serverId/findServer').get(findOnes.findServer)
router.route('/:itemId/:deviceId/findDevice').get(findOnes.findDevice)
router.route('/:itemId/:scanEmailId/findScanEmail').get(findOnes.findScanEmail)
router.route('/:itemId/:scanFolder/findScanFolder').get(findOnes.findScanFolder)
router.route('/:itemId/:network/findNetwork').get(findOnes.findNetwork)
router.route('/:itemId/:solutionInfo/findSolution').get(findOnes.findSolution)

router
  .route('/:itemId')
  .get(helpers.getOneItem)
  .put(helpers.updateItem)
  .delete(helpers.deleteItem)

// INSERTS
router.route('/:itemId/insertMethod').put(inserts.insertMethod)
router.route('/:itemId/insertContact').put(inserts.insertContact)
router.route('/:itemId/insertDevice').put(inserts.insertDevice)
router.route('/:itemId/insertServer').put(inserts.insertServer)
router.route('/:itemId/insertScanFolder').put(inserts.insertScanFolder)
router.route('/:itemId/insertScanEmail').put(inserts.insertScanEmail)
router.route('/:itemId/insertNetwork').put(inserts.insertNetwork)
router.route('/:itemId/insertSolution').put(inserts.insertSolution)

router.route('/:itemId/insertOneServerSetup').put(inserts.insertOneServerSetup)
router
  .route('/:itemId/insertOneServerSetup2')
  .put(
    multer({ storage: fileStorage, fileFilter }).single('image'),
    inserts.insertOneServerSetup2
  )

// UPDATES
router.route('/:itemId/updateMethodInfo').put(helpers.updateMethodInfo)
router.route('/:itemId/updateDevice').put(helpers.updateDevice)
router.route('/:itemId/updateServer').put(helpers.updateServer)
router.route('/:itemId/updateServerSetup').put(helpers.updateServerSetup)
router.route('/:itemId/updateContact').put(helpers.updateContact)
router.route('/:itemId/updateScanEmail').put(helpers.updateScanEmail)
router.route('/:itemId/updateScanFolder').put(helpers.updateScanFolder)
router.route('/:itemId/updateNetwork').put(helpers.updateNetwork)
router.route('/:itemId/updateSolution').put(helpers.updateSolution)

// router
//   .route('/:itemId/insertOneServerSetup')
//   .post(
//     multer({ storage: fileStorage, fileFilter }).single('image'),
//     helpers.insertOneServerSetup
//   )

module.exports = router
