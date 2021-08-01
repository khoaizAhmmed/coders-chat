/* eslint-disable no-console */
const bcrypt = require('bcrypt')
const { unlink } = require('fs')
const path = require('path')

const User = require('../models/People')

const UsersController = {
  getUsers: async (req, res, next) => {
    try {
      const users = await User.find()
      res.render('users', {
        users,
      })
    } catch (err) {
      next(err)
    }
  },
  addUser: async (req, res, next) => {
    let newUser;
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    if (req.files && req.files.length > 0) {
      newUser = new User({
        ...req.body,
        avatar: req.files[0].filename,
        password: hashedPassword,
      })
    } else {
      newUser = new User({
        ...req.body,
        password: hashedPassword,
      })
    }
    try {
      await newUser.save()
      res.status(200).json({
        message: 'User was added successfully!',
      })
    } catch (err) {
      res.status(500).json({
        errors: {
          common: {
            msg: 'Unknown message occured!',
          },
        },
      })
    }
  },
  removeUser: async (req, res, next) => {
    try {
      const user = await User.findByIdAndDelete({
        _id: req.params.id,
      })
      if (user.avatar) {
        unlink(
          path.join(__dirname, `/../../uploads/avatars/${user.avatar}`),
          (err) => {
            if (err) {
              console.log(err)
            }
          },
        )
      }
      res.status(200).json({
        message: 'User was remove Successfully!',
      })
    } catch (err) {
      res.status(500).json({
        errors: {
          common: {
            msg: 'Could not delete the user',
          },
        },
      })
    }
  },
}

module.exports = UsersController
