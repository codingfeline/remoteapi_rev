const router = require('express').Router()
const verify = require('./verifyToken')
// const Menus = require('../model/Menu')
const helpers = require('../helpers/wines')

router.route('/')
.get(helpers.getAllItems)
.post(verify, helpers.createWine)

router.route('/:wineId')
.get(helpers.getOneItem)
.put(verify, helpers.updateWine)
.delete(verify, helpers.deleteWine)

module.exports = router