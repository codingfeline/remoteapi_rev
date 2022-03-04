const router = require('express').Router()
const User = require('../model/User')
const Menus = require('../model/Menu')
const jwt = require('jsonwebtoken')
const { registerValidation } = require('../validation')
const bcrypt = require('bcryptjs')

router.post('/register', async (req, res) => {
  // VALIDATE DATA
  const { error } = registerValidation(req.body)

  if (error) return res.status(400).send(error.details[0].message)

  const emailExist = await User.findOne({ email: req.body.email })
  if (emailExist) return res.status(400).send('Email already exists')

  // hashing password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  })
  try {
    const savedUser = await user.save()
    res.send(savedUser)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.post('/login', async (req, res) => {
  // const {error} = loginValidation(req.body)
  // if(error) return res.status(400).send(error.details[0].message)

  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Email-password combination not found.')

  const validPass = await bcrypt.compare(req.body.password, user.password)
  if (!validPass) return res.status(400).send('Email-password combination not found.')

  // create and assign a token
  // const maxAge = 60
  const maxAge = 24 * 60 * 60
  // const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  })
  // console.log(user)
  return res.status(200).header('token', token).json({ title: 'login', user, token })
  // res.header('auth-token', token).send(token)

  // res.send('Logged in')
})

module.exports = router
