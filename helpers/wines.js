const Wines = require('../model/Wines')

exports.getAllItems = (req, res) => {
  Wines.find()
  .then(menu => res.json(menu))
  .catch(err => res.send(err))
}

exports.getOneItem = (req, res) => {
  Wines.findById(req.params.wineId)
  .then(menu => res.json(menu))
  .catch(err => res.send(err))
}

exports.createWine = async (req, res) => {
  await Wines.create(req.body)
  .then( newItem => res.status(201).json(newItem))
  .catch( err => res.send(err))
}

exports.deleteWine = async (req, res) => {
  await Wines.findOneAndDelete({_id: req.params.wineId})
  .then( () => res.json({message: 'Item deleted'}))
  .catch( err => res.send(err))
}

exports.updateWine = async (req, res) => {
  await Wines.findOneAndUpdate({_id: req.params.wineId}, req.body, {new: true})
  .then( menu => res.json(menu))
  .catch( err => res.send(err))
}

module.exports = exports