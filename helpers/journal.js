const Journal = require('../model/Journal')

exports.getAllItems = async (req, res) => {
  await Journal.find()
  .then(menu => res.json(menu))
  .catch(err => res.send(err))
}

exports.getOneItem = (req, res) => {
  Journal.findById(req.params.itemId)
  .then(menu => res.json(menu))
  .catch(err => res.send(err))
}

exports.createItem = async (req, res) => {
  await Journal.create(req.body)
  .then( newItem => res.status(201).json(newItem))
  .catch( err => res.send(err))
}

exports.deleteItem = async (req, res) => {
  await Journal.findOneAndDelete({_id: req.params.itemId})
  .then( () => res.json({message: 'Item deleted'}))
  .catch( err => res.send(err))
}

exports.updateItem = async (req, res) => {
  await Journal.findOneAndUpdate({_id: req.params.itemId}, req.body, {new: true})
  .then( menu => res.json(menu))
  .catch( err => res.send(err))
}

module.exports = exports

// variables to change
// Journal, planId