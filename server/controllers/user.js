/**
 * Created by supervlad on 8/31/16.
 */

const User = require('../models/user')

exports.getUsers = function* (req, res) {
  try {
    const users = yield User.find({})
    return res.json({ payload: users })
  }
  catch (error) {
    return res.status(500).json({ error })
  }
}

exports.postUser = function* (req, res) {
  try {
    const user = yield User.findOne({ email: req.body.email })
    if (!user) {
      const newUser = new User(req.body)
      yield newUser.hashPassword()
      yield newUser.save()
      return res.json({ payload: newUser })
    }
    return res.status(400).json({ error: new Error('User already exists') })
  }
  catch (error) {
    return res.status(500).json({ error })
  }
}

exports.deleteUser = function* (req, res) {
  try {
    const user = yield User.findByIdAndRemove(req.params.id)
    return res.json({ payload: user })
  }
  catch (error) {
    return res.status(500).json({ error })
  }
}