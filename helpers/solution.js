const Solution = require('../model/Solutions')

exports.getAll = (req, res) => {
  Solution.find()
    .then(menu => res.json(menu))
    .catch(err => res.send(err))
}

exports.getOneItem = (req, res) => {
  Solution.findById(req.params.id)
    .then(menu => res.json(menu))
    .catch(err => res.send(err))
}

exports.create = async (req, res) => {
  await Solution.create(req.body)
    .then(newItem => {
      console.log('solution > create', newItem)
    })
    .then(newItem => res.status(201).json(newItem))
    .catch(err => res.send(err))
}

exports.deleteMenu = async (req, res) => {
  await Solution.findOneAndDelete({ _id: req.params.id })
    .then(() => res.json({ message: 'Item deleted' }))
    .catch(err => res.send(err))
}

exports.updateMenu = async (req, res) => {
  // console.log(req.params)
  // console.log(req.body)
  // return
  await Solution.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(menu => res.json(menu))
    .catch(err => res.send(err))
}

module.exports = exports
