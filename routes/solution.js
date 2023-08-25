const router = require('express').Router()
const verify = require('./verifyToken')
const helpers = require('../helpers/solution')

router.route('/').get(helpers.getAll).post(helpers.create)

// router
//   .route('/:itemId')
//   .get(helpers.getOneItem)
//   .put(verify, helpers.updateItem)
//   .delete(verify, helpers.deleteItem)

module.exports = router
