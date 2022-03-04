const Menus = require('../model/Menu')

exports.getAllItems = (req, res) => {
  Menus.find()
  .then(menu => res.json(menu))
  .catch(err => res.send(err))
}

exports.getOneItem = (req, res) => {
  Menus.findById(req.params.menuId)
  .then(menu => res.json(menu))
  .catch(err => res.send(err))
}

exports.createMenu = async (req, res) => {
  await Menus.create(req.body)
  .then( newItem => res.status(201).json(newItem))
  .catch( err => res.send(err))
}

exports.deleteMenu = async (req, res) => {
  await Menus.findOneAndDelete({_id: req.params.menuId})
  .then( () => res.json({message: 'Item deleted'}))
  .catch( err => res.send(err))
}

exports.updateMenu = async (req, res) => {
  await Menus.findOneAndUpdate({_id: req.params.menuId}, req.body, {new: true})
  .then( menu => res.json(menu))
  .catch( err => res.send(err))
}

module.exports = exports