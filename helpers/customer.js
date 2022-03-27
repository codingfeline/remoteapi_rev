const Customer = require('../model/Customers')

exports.getAllItems = async (req, res) => {
  await Customer.find()
    .then(menu => {
      res.json(menu)
      // console.log('ok')
    })
    // .then(menu => res.json(menu))
    .catch(err => res.send(err))
}

exports.getOneItem = (req, res) => {
  Customer.findById(req.params.itemId)
    .then(menu => res.json(menu))
    .catch(err => res.send(err))
}

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

exports.deleteItem = async (req, res) => {
  await Customer.findOneAndDelete({ _id: req.params.itemId })
    .then(() => res.json({ message: 'Item deleted' }))
    .catch(err => res.send(err))
}

exports.updateItem = async (req, res) => {
  await Customer.findOneAndUpdate({ _id: req.params.itemId }, req.body, { new: true })
    .then(menu => {
      res.json(menu)
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

exports.updateOneServerSetup = async (req, res) => {
  // console.log(req.body.serverSetup)
  // return false
  let oldScreenshot = req.body.serverSetup.old
  custId = req.params.itemId
  custName = req.body.serverSetup.name
  comment = req.body.serverSetup.comment
  const fs = require('fs')
  const uuid = require('uuid').v4

  let base64Str = req.body.serverSetup.screenshot
  let base64Img = base64Str.split(';base64,').pop()
  let uniq = uuid()
  let imageName = `${uniq}__screenshot.png`
  let path = 'public/screenshots/'

  // if new image is submitted, create it and delete the old one
  if (base64Str != '<br>') {
    fs.writeFile(path + imageName, base64Img, { encoding: 'base64' }, function (err) {
      if (err) console.log(err)
      console.log(`file ${imageName}, path ${path} created`)
      fs.unlinkSync(`./public/screenshots/${oldScreenshot}`) // delete old
    })
  }
  //if no new image is submitted, just update the comment
  if (base64Str === '<br>') {
    await Customer.findOneAndUpdate(
      { _id: custId, 'serverSetup._id': req.body.serverSetup.id },
      {
        $set: {
          'serverSetup.$.comment': comment,
        },
      },
      { new: true }
    )
      .then(menu => {
        res.json(menu) // console.log(req.body)
      })
      .catch(err => res.send(err))
  } else {
    // if new image is submitted, update all
    await Customer.findOneAndUpdate(
      { _id: custId, 'serverSetup._id': req.body.serverSetup.id },
      {
        $set: {
          'serverSetup.$.screenshot': imageName,
          'serverSetup.$.path': path,
          'serverSetup.$.comment': comment,
        },
      },
      { new: true }
    )
      .then(menu => {
        res.json(menu) // console.log(req.body)
      })
      .catch(err => res.send(err))
  }
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

exports.insertOneContact = async (req, res) => {
  await Customer.findOneAndUpdate(
    { _id: req.params.itemId },
    {
      $push: { contact: req.body.contact },
    },
    { new: true }
  )
    .then(menu => {
      res.json(menu)
      console.log(req.body, menu)
    })
    .catch(err => res.send(err))
}

exports.updateOneContact = async (req, res) => {
  console.log(req.body)
  await Customer.findOneAndUpdate(
    { _id: req.params.itemId, 'contact._id': req.body.contact[0]._id },
    {
      $set: {
        'contact.$.name': req.body.contact[0].name,
        'contact.$.tel': req.body.contact[0].tel,
        'contact.$.email': req.body.contact[0].email,
      },
    },
    { new: true }
  )
    .then(menu => {
      res.json(menu)
      console.log(req.body)
    })
    .catch(err => res.send(err))
}

exports.insertOneDevicePassword = async (req, res) => {
  await Customer.findOneAndUpdate(
    { _id: req.params.itemId },
    {
      $push: { devicePassword: req.body.devicePassword },
    },
    { new: true }
  )
    .then(menu => {
      res.json(menu)
      console.log(req.body, menu)
    })
    .catch(err => res.send(err))
}

exports.updateOneDevicePassword = async (req, res) => {
  await Customer.findOneAndUpdate(
    { _id: req.params.itemId, 'devicePassword._id': req.body.devicePassword[0]._id },
    {
      $set: {
        'devicePassword.$.make': req.body.devicePassword[0].make,
        'devicePassword.$.username': req.body.devicePassword[0].username,
        'devicePassword.$.password': req.body.devicePassword[0].password,
      },
    },
    { new: true }
  )
    .then(menu => {
      res.json(menu)
      console.log(req.body)
    })
    .catch(err => res.send(err))
}

exports.insertOneServer = async (req, res) => {
  console.log(req.body, req.params.itemId)
  await Customer.findOneAndUpdate(
    { _id: req.params.itemId },
    {
      $push: { server: req.body.server },
    },
    { new: true }
  )
    .then(menu => {
      res.json(menu)
      console.log(req.body)
    })
    .catch(err => res.send(err))
}
exports.updateOneServer = async (req, res) => {
  await Customer.findOneAndUpdate(
    { _id: req.params.itemId, 'server._id': req.body.server[0]._id },
    {
      $set: {
        'server.$.name': req.body.server[0].name,
        'server.$.username': req.body.server[0].username,
        'server.$.password': req.body.server[0].password,
        'server.$.ip': req.body.server[0].ip,
      },
    },
    { new: true }
  )
    .then(menu => {
      res.json(menu)
      console.log(req.body)
    })
    .catch(err => res.send(err))
}

exports.insertOneMethod = async (req, res) => {
  await Customer.findOneAndUpdate(
    { _id: req.params.itemId },
    {
      $push: { methodInfo: req.body.methodInfo },
    },
    { new: true }
  )
    .then(menu => {
      res.json(menu)
      console.log(req.body)
    })
    .catch(err => res.send(err))
}
exports.updateMethodInfo = async (req, res) => {
  // let set = {}
  // for (let field in req.body) {
  //   set['methodInfo.$.' + field] = req.body[field]
  // }
  await Customer.findOneAndUpdate(
    { _id: req.params.itemId, 'methodInfo._id': req.body.methodInfo[0]._id },
    // { $set: { methodInfo$: req.body.methodInfo } },
    // { $set: set },
    {
      $set: {
        'methodInfo.$.methodName': req.body.methodInfo[0].methodName,
        'methodInfo.$.username': req.body.methodInfo[0].username,
        'methodInfo.$.password': req.body.methodInfo[0].password,
        'methodInfo.$.url': req.body.methodInfo[0].url,
        'methodInfo.$.notes': req.body.methodInfo[0].notes,
      },
    },
    { new: true }
  )
    .then(menu => {
      res.json(menu)
      console.log(req.body.methodInfo)
    })
    .catch(err => res.send(err))
}

module.exports = exports
