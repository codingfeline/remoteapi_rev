const Order = require('../model/Orders')

exports.getAllItems = (req, res) => {
  Order.find()
  .then(menu => res.json(menu))
  .catch(err => res.send(err))
}

exports.getOneItem = (req, res) => {
  Order.findById(req.params.itemId)
  .then(menu => res.json(menu))
  .catch(err => res.send(err))
}

exports.createItem = async (req, res) => {
  await Order.create(req.body)
  .then( newItem => res.status(201).json(newItem))
  .catch( err => res.send(err))
}

exports.deleteItem = async (req, res) => {
  await Order.findOneAndDelete({_id: req.params.itemId})
  .then( () => res.json({message: 'Item deleted'}))
  .catch( err => res.send(err))
}

exports.updateItem = async (req, res) => {
  await Order.findOneAndUpdate({_id: req.params.itemId}, req.body, {new: true})
  .then( menu => res.json(menu))
  .catch( err => res.send(err))
}

module.exports = exports