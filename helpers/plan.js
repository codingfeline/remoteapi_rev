const Plan = require('../model/Plan')

exports.getAllItems = async (req, res) => {
  await Plan.find()
  .then(menu => res.json(menu))
  .catch(err => res.send(err))
}

exports.getOneItem = (req, res) => {
  Plan.findById(req.params.planId)
  .then(menu => res.json(menu))
  .catch(err => res.send(err))
}

exports.createItem = async (req, res) => {
  await Plan.create(req.body)
  .then( newItem => res.status(201).json(newItem))
  .catch( err => res.send(err))
}

exports.deleteItem = async (req, res) => {
  await Plan.findOneAndDelete({_id: req.params.planId})
  .then( () => res.json({message: 'Item deleted'}))
  .catch( err => res.send(err))
}

exports.updateItem = async (req, res) => {
  await Plan.findOneAndUpdate({_id: req.params.planId}, req.body, {new: true})
  .then( menu => res.json(menu))
  .catch( err => res.send(err))
}

module.exports = exports

// variables to change
// Plan, planId