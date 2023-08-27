const Customer = require('../model/Customers')

exports.getAllItems = async (req, res) => {
  await Customer.find()
    .then(menu => {
      res.json(menu)
    })
    .catch(err => res.send(err))
}

exports.getNameId = async (req, res) => {
  await Customer.find()
    .then(menu => {
      res.json(
        menu.map(c => {
          return {
            _id: c._id,
            name: c.name,
          }
        })
      )
    })
    .catch(err => res.send(err))
}

exports.getOneItem = (req, res) => {
  Customer.findById(req.params.itemId)
    .then(menu => res.json(menu))
    .catch(err => res.send(err))
}

exports.create = async (req, res) => {
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

exports.updateServerSetup = async (req, res) => {
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

  // if (base64Str.indexOf('data') === -1) console.log('no new image')
  // if (base64Str.indexOf('data') !== -1) console.log('new image')
  // return

  // if new image is submitted, create it and delete the old one
  if (base64Str.includes('data')) {
    fs.writeFile(path + imageName, base64Img, { encoding: 'base64' }, function (err) {
      if (err) console.log(err)
      console.log(`file ${imageName}, path ${path} created`)
      fs.unlinkSync(`./public/screenshots/${oldScreenshot}`) // delete old
    })
  }
  //if no new image is submitted, just update the comment
  if (!base64Str.includes('data')) {
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

exports.updateContact = async (req, res) => {
  await Customer.findOneAndUpdate(
    { _id: req.params.itemId, 'contact._id': req.body._id },
    {
      $set: {
        'contact.$.name': req.body.name,
        'contact.$.tel': req.body.tel,
        'contact.$.email': req.body.email,
      },
    },
    { new: true }
  )
    .then(menu => {
      res.json(menu)
    })
    .catch(err => res.send(err))
}

exports.updateDevice = async (req, res) => {
  await Customer.findOneAndUpdate(
    { _id: req.params.itemId, 'devicePassword._id': req.body._id },
    {
      $set: {
        'devicePassword.$.make': req.body.make,
        'devicePassword.$.username': req.body.username,
        'devicePassword.$.password': req.body.password,
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

exports.updateScanEmail = async (req, res) => {
  await Customer.findOneAndUpdate(
    { _id: req.params.itemId, 'scanEmail._id': req.body._id },
    {
      $set: {
        'scanEmail.$.make': req.body.hostname,
        'scanEmail.$.username': req.body.username,
        'scanEmail.$.password': req.body.password,
        'scanEmail.$.port': req.body.port,
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

exports.updateScanFolder = async (req, res) => {
  await Customer.findOneAndUpdate(
    { _id: req.params.itemId, 'scanFolder._id': req.body._id },
    {
      $set: {
        'scanFolder.$.make': req.body.hostname,
        'scanFolder.$.username': req.body.username,
        'scanFolder.$.password': req.body.password,
        'scanFolder.$.folder': req.body.folder,
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

exports.updateNetwork = async (req, res) => {
  let dns = req.body.dns1
  if (req.body.dns2) dns = dns + ',' + req.body.dns2
  if (req.body.dns3) dns = dns + ',' + req.body.dns3
  await Customer.findOneAndUpdate(
    { _id: req.params.itemId, 'network._id': req.body._id },
    {
      $set: {
        'network.$.name': req.body.name,
        'network.$.domain': req.body.domain,
        'network.$.dns': dns,
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

exports.updateServer = async (req, res) => {
  await Customer.findOneAndUpdate(
    { _id: req.params.itemId, 'server._id': req.body._id },
    {
      $set: {
        'server.$.name': req.body.name,
        'server.$.username': req.body.username,
        'server.$.password': req.body.password,
        'server.$.ip': req.body.ip,
      },
    },
    { new: true }
  )
    .then(menu => {
      res.json(menu)
    })
    .catch(err => res.send(err))
}

exports.updateMethodInfo = async (req, res) => {
  await Customer.findOneAndUpdate(
    { _id: req.params.itemId, 'methodInfo._id': req.body._id },
    {
      $set: {
        'methodInfo.$.methodName': req.body.methodName,
        'methodInfo.$.username': req.body.username,
        'methodInfo.$.password': req.body.password,
        'methodInfo.$.url': req.body.url,
        'methodInfo.$.notes': req.body.notes,
      },
    },
    { new: true }
  )
    .then(menu => {
      res.json(menu)
    })
    .catch(err => res.send(err))
}

module.exports = exports
