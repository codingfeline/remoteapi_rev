const router = require('express').Router()
const verify = require('./verifyToken')
const helpers = require('../helpers/order')

router.route('/')
.get(helpers.getAllItems)
.post(verify, helpers.createItem)

router.route('/:itemId')
.get(helpers.getOneItem)
.put(verify, helpers.updateItem)
.delete(verify, helpers.deleteItem)

module.exports = router