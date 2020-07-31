const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function (req, res) {

  const candidate = await User.findOne({email: req.body.email})

  if (candidate) {
    // Check password. User is present
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
    if (passwordResult) {
      // Generate token if passwords are the same
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
      }, keys.jwt, {expiresIn: 60 * 60})
      res.status(200).json({
        token: `Bearer ${token}`
      })
    } else {
      res.status(401).json({
        message: 'Password is incorrect. Please try again'
      })
    }
  } else {
    // No such user, error
    res.status(404).json({
      message: "User with such name is not found"
    })
  }

}

module.exports.register = async function (req, res) {

  const candidate = await User.findOne({email: req.body.email})

  if (candidate) {
    // User is already registered. Send error
    res.status(409).json({
      message: 'This email is already registered. Try different email.'
    })
  } else {
    // Create user
    const salt = bcrypt.genSaltSync(10)
    const password = req.body.password
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt)
    })
    try {
      await user.save()
      res.status(201).json(user)
    } catch(e) {
      // Error handling
      errorHandler(res, e)
    }
  }
}
