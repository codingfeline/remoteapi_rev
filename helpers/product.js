const Products = require('../model/Products')

exports.getAllItems = (req, res) => {
  Order.find()
    .then(menu => res.json(menu))
    .catch(err => res.send(err))
}

exports.getOneItem = (req, res) => {
  Products.findById(req.params.itemId)
    .then(menu => res.json(menu))
    .catch(err => res.send(err))
}

exports.createItem = async (req, res) => {
  const img = req.file
  console.log('file 2', img)
  if (!img) {
    res.send('not supported')
  } else {
    await Products.create({
      ...img,
      description: req.body.description,
    })
      .then(newItem => res.status(201).json(newItem))
      .catch(err => res.send(err))
  }
}

exports.deleteItem = async (req, res) => {
  await Products.findOneAndDelete({ _id: req.params.itemId })
    .then(() => res.json({ message: 'Item deleted' }))
    .catch(err => res.send(err))
}

exports.updateItem = async (req, res) => {
  await Products.findOneAndUpdate({ _id: req.params.itemId }, req.body, { new: true })
    .then(menu => res.json(menu))
    .catch(err => res.send(err))
}

module.exports = exports
