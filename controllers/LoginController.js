const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const createError = require('http-errors')

const User = require('../models/People')

const LoginController = {
  getLogin: (req, res, next) => {
    res.render('index')
  },
  login: async (req, res, next) => {
    try {
      const user = await User.findOne({
        $or: [{ email: req.body.username }, { mobile: req.body.username }],
      })
      // eslint-disable-next-line no-underscore-dangle
      if (user && user._id) {
        const isValidPassword = await bcrypt.compare(req.body.password, user.password)
        if (isValidPassword) {
          const userObject = {
            username: user.name,
            role: 'user',
          }
          const token = jwt.sign(userObject, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRY,
          })
          res.cookie(process.env.COOKIE_NAME, token, {
            maxAge: process.env.JWT_EXPIRY,
            httpOnly: true,
            signed: true,
          })
          res.locals.loggedInUser = userObject
          res.render('inbox')
        } else {
          throw createError('Login failed! please try again')
        }
      } else {
        throw createError('Login failed! please try again')
      }
    } catch (err) {
      res.render('index', {
        data: {
          username: req.body.username,
        },
        errors: {
          common: {
            msg: err.message,
          },
        },
      })
    }
  },
  logout: (req, res, next) => {
    res.clearCookie(process.env.COOKIE_NAME)
    res.send('log out')
  },
}

module.exports = LoginController
