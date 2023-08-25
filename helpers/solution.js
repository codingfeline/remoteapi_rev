const Solution = require('../model/Solutions')

exports.getAll = (req, res) => {
  Solution.find()
    .then(menu => res.json(menu))
    .catch(err => res.send(err))
}

exports.getOneItem = (req, res) => {
  Solution.findById(req.params.menuId)
    .then(menu => res.json(menu))
    .catch(err => res.send(err))
}

exports.create = async (req, res) => {
  await Solution.create(req.body)
    .then(newItem => {
      console.log(newItem)
    })
    .then(newItem => res.status(201).json(newItem))
    .catch(err => res.send(err))
}

exports.deleteMenu = async (req, res) => {
  await Solution.findOneAndDelete({ _id: req.params.menuId })
    .then(() => res.json({ message: 'Item deleted' }))
    .catch(err => res.send(err))
}

exports.updateMenu = async (req, res) => {
  await Solution.findOneAndUpdate({ _id: req.params.menuId }, req.body, { new: true })
    .then(menu => res.json(menu))
    .catch(err => res.send(err))
}

module.exports = exports
