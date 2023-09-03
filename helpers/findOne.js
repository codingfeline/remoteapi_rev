const Customer = require('../model/Customers')
const mongoose = require('mongoose')

exports.getOneItem = (req, res) => {
  Customer.findById(req.params.itemId)
    .then(menu => res.json(menu))
    .catch(err => res.send(err))
}

exports.findMethod = async (req, res) => {
  Customer.findOne(
    {
      _id: req.params.itemId,
      'methodInfo._id': req.params.methodId,
    },
    { 'methodInfo.$': 1, _id: 0 },
    (err, customer) => {
      if (err) {
        console.error('Error retrieving data:', err)
      } else {
        if (customer && customer.methodInfo && customer.methodInfo.length > 0) {
          console.log('Retrieved methodInfo:', customer.methodInfo[0])
          res.send(customer.methodInfo[0])
        } else {
          console.log('MethodInfo not found.')
          res.send('MethodInfo not found.')
        }
      }
    }
  )
}

exports.findContact = async (req, res) => {
  Customer.findOne(
    {
      _id: req.params.itemId,
      'contact._id': req.params.contactId,
    },
    { 'contact.$': 1, _id: 0 },
    (err, customer) => {
      if (err) {
        console.error('Error retrieving data:', err)
      } else {
        if (customer && customer.contact && customer.contact.length > 0) {
          console.log('Retrieved contact:', customer.contact[0])
          res.send(customer.contact[0])
        } else {
          console.log('Contact not found.')
          res.send('Contact not found.')
        }
      }
      // Close the Mongoose connection
    }
  )
}

exports.findServer = async (req, res) => {
  Customer.findOne(
    {
      _id: req.params.itemId,
      'server._id': req.params.serverId,
    },
    { 'server.$': 1, _id: 0 },
    (err, customer) => {
      if (err) {
        console.error('Error retrieving data:', err)
      } else {
        if (customer && customer.server && customer.server.length > 0) {
          console.log('Retrieved server:', customer.server[0])
          res.send(customer.server[0])
        } else {
          console.log('Server not found.')
          res.send('Server not found.')
        }
      }
      // Close the Mongoose connection
    }
  )
}

exports.findDevice = async (req, res) => {
  Customer.findOne(
    {
      _id: req.params.itemId,
      'devicePassword._id': req.params.deviceId,
    },
    { 'devicePassword.$': 1, _id: 0 },
    (err, customer) => {
      if (err) {
        console.error('Error retrieving data:', err)
      } else {
        if (customer && customer.devicePassword && customer.devicePassword.length > 0) {
          console.log('Retrieved device:', customer.devicePassword[0])
          res.send(customer.devicePassword[0])
        } else {
          console.log('Device not found.')
          res.send('Device not found.')
        }
      }
      // Close the Mongoose connection
    }
  )
}

exports.findScanEmail = async (req, res) => {
  Customer.findOne(
    {
      _id: req.params.itemId,
      'scanEmail._id': req.params.scanEmailId,
    },
    { 'scanEmail.$': 1, _id: 0 },
    (err, customer) => {
      if (err) {
        console.error('Error retrieving data:', err)
      } else {
        if (customer && customer.scanEmail && customer.scanEmail.length > 0) {
          console.log('Retrieved device:', customer.scanEmail[0])
          res.send(customer.scanEmail[0])
        } else {
          console.log('Device not found.')
          res.send('Device not found.')
        }
      }
      // Close the Mongoose connection
    }
  )
}

exports.findScanFolder = async (req, res) => {
  Customer.findOne(
    {
      _id: req.params.itemId,
      'scanFolder._id': req.params.scanFolder,
    },
    { 'scanFolder.$': 1, _id: 0 },
    (err, customer) => {
      if (err) {
        console.error('Error retrieving data:', err)
      } else {
        if (customer && customer.scanFolder && customer.scanFolder.length > 0) {
          console.log('Retrieved scanFolder:', customer.scanFolder[0])
          res.send(customer.scanFolder[0])
        } else {
          console.log('ScanFolder not found.')
          res.send('ScanFolder not found.')
        }
      }
      // Close the Mongoose connection
    }
  )
}

exports.findNetwork = async (req, res) => {
  Customer.findOne(
    {
      _id: req.params.itemId,
      'network._id': req.params.network,
    },
    { 'network.$': 1, _id: 0 },
    (err, customer) => {
      if (err) {
        console.error('Error retrieving data:', err)
      } else {
        if (customer && customer.network && customer.network.length > 0) {
          console.log('Retrieved network:', customer.network[0])
          res.send(customer.network[0])
        } else {
          console.log('Network not found.')
          res.send('Network not found.')
        }
      }
      // Close the Mongoose connection
    }
  )
}

exports.findSolution = async (req, res) => {
  Customer.findOne(
    {
      _id: req.params.itemId,
      'solutionInfo._id': req.params.solutionInfo,
    },
    { 'solutionInfo.$': 1, _id: 0 },
    (err, customer) => {
      if (err) {
        console.error('Error retrieving data:', err)
      } else {
        if (customer && customer.solutionInfo && customer.solutionInfo.length > 0) {
          console.log('Retrieved solutionInfo:', customer.solutionInfo[0])
          res.send(customer.solutionInfo[0])
        } else {
          console.log('SolutionInfo not found.')
          res.send('SolutionInfo not found.')
        }
      }
      // Close the Mongoose connection
    }
  )
}

module.exports = exports
