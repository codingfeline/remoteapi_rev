const Customer = require('../model/Customers')

exports.createItem = async (req, res) => {
  const fs = require('fs')
  return await Customer.create(req.body)
    .then(newItem => {
      res.status(201).json(newItem)
      // console.log(req.body)
      console.log(newItem._id)
      let path = './public/screenshots/' + newItem._id + '/'
      fs.mkdirSync(path)
    })
    .catch(err => res.send(err))
}

exports.insertOneServerSetup2 = async (req, res) => {
  const img = req.file
  console.log('file', img)
  console.log(req.body)
  if (!img) {
    res.send('not supported')
  } else {
    await Customer.findOneAndUpdate(
      { _id: req.params.itemId },
      {
        $push: {
          serverSetup: {
            ...img,
            screenshot: img.filename,
            path: img.path,
            comment: req.body.comment,
          },
        },
        // comment: req.body.serverSetup.comment,
      },
      { new: true }
    )
      .then(newItem => res.status(201).json(newItem))
      .catch(err => res.send(err))
  }
}

exports.insertOneServerSetup = (req, res) => {
  const fs = require('fs')
  const uuid = require('uuid').v4

  let base64Str = req.body.screenshot
  let base64Img = base64Str.split(';base64,').pop()
  // let uniq = new Date().toISOString()
  let uniq = uuid()
  let imageName = `${uniq}__screenshot.png`
  let path = 'public/screenshots/'
  // if (!fs.existsSync(path)) fs.mkdirSync(path)
  fs.writeFile(path + imageName, base64Img, { encoding: 'base64' }, function (err) {
    if (err) console.log(err)
    console.log(`file ${imageName} created`)
  })
  console.log(imageName)
  console.log(req.body.comment)
  return Customer.findOneAndUpdate(
    { _id: req.params.itemId },
    {
      $push: {
        serverSetup: {
          comment: req.body.comment,
          screenshot: imageName,
          path,
        },
      },
    },
    { new: true }
  )
    .then(menu => {
      res.json(menu)
      // console.log(req.body)
    })
    .catch(err => res.send(err))
}

exports.insertOneServerSetup1 = async (req, res) => {
  await Customer.findOneAndUpdate(
    { _id: req.params.itemId },
    {
      $push: {
        serverSetup: {
          comment: req.body.serverSetup.comment,
          screenshot: req.body.serverSetup.screenshot,
          path: '',
        },
      },
      // $push: { serverSetup: req.body.serverSetup },
    },
    { new: true }
  )
    .then(menu => {
      res.json(menu)
      // console.log(req.body)
    })
    .catch(err => res.send(err))
}

exports.insertContact = async (req, res) => {
  await Customer.findOneAndUpdate(
    { _id: req.params.itemId },
    {
      $push: { contact: req.body },
    },
    { new: true }
  )
    .then(menu => {
      res.json(menu)
      console.log(req.body)
    })
    .catch(err => res.send(err))
}

exports.insertDevice = async (req, res) => {
  await Customer.findOneAndUpdate(
    { _id: req.params.itemId },
    {
      $push: { devicePassword: req.body },
    },
    { new: true }
  )
    .then(menu => {
      res.json(menu)
      console.log(req.body, menu)
    })
    .catch(err => res.send(err))
}

exports.insertScanFolder = async (req, res) => {
  await Customer.findOneAndUpdate(
    { _id: req.params.itemId },
    {
      $push: { scanFolder: req.body },
    },
    { new: true }
  )
    .then(menu => {
      res.json(menu)
      console.log(req.body, menu)
    })
    .catch(err => res.send(err))
}

exports.insertScanEmail = async (req, res) => {
  await Customer.findOneAndUpdate(
    { _id: req.params.itemId },
    {
      $push: { scanEmail: req.body },
    },
    { new: true }
  )
    .then(menu => {
      res.json(menu)
      console.log(req.body, menu)
    })
    .catch(err => res.send(err))
}

exports.insertNetwork = async (req, res) => {
  await Customer.findOneAndUpdate(
    { _id: req.params.itemId },
    {
      $push: { network: req.body },
    },
    { new: true }
  )
    .then(menu => {
      res.json(menu)
      console.log(req.body, menu)
    })
    .catch(err => res.send(err))
}

exports.insertServer = async (req, res) => {
  await Customer.findOneAndUpdate(
    { _id: req.params.itemId },
    {
      $push: { server: req.body },
    },
    { new: true }
  )
    .then(menu => {
      res.json(menu)
      console.log(req.body)
    })
    .catch(err => res.send(err))
}

exports.insertMethod = async (req, res) => {
  await Customer.findOneAndUpdate(
    { _id: req.params.itemId },
    {
      $push: { methodInfo: req.body },
    },
    { new: true }
  )
    .then(menu => {
      res.json(menu)
      console.log(req.body)
    })
    .catch(err => res.send(err))
}

exports.insertSolution = async (req, res) => {
  await Customer.findOneAndUpdate(
    { _id: req.params.itemId },
    {
      $push: { solutionInfo: req.body },
    },
    { new: true }
  )
    .then(menu => {
      res.json(menu)
      console.log(req.body)
    })
    .catch(err => res.send(err))
}

module.exports = exports
