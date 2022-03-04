const router = require('express').Router()
const verify = require('./verifyToken')
// const Menus = require('../model/Menu')
const helpers = require('../helpers/menu')

router.route('/')
.get(helpers.getAllItems)
.post(verify, helpers.createMenu)

router.route('/:menuId')
.get(helpers.getOneItem)
.put(verify, helpers.updateMenu)
.delete(verify, helpers.deleteMenu)

// router.post('/', verify, async (req, res) => {
//   console.log(req.body)
//   await Menus.create(req.body)
//   .then( newItem => {
//     res.status(201).json(newItem)
//   })
//   .catch( err => res.send(err))
// })

// router.put('/:menuId', verify, async (req, res) => {
//   await Menus.findOneAndUpdate({_id: req.params.menuId}, req.body, {new: true})
//   .then( menu => res.json(menu))
//   .catch( err => res.send(err))
// })

// router.delete('/:menuId', verify, async (req, res) => {
//   await Menus.findOneAndDelete({_id: req.params.menuId})
//   .then( () => res.json({message: 'Item deleted'}))
//   .catch( err => res.send(err))
// })

// router.get('/', verify, async (req, res) => {
//   const menus =  await Menus.find()
//   return res.status(200).json(menus)
// })

module.exports = router