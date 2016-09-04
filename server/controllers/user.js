/**
 * Created by supervlad on 8/31/16.
 */

const User = require('../models/user')

exports.getUsers = function* (req, res, next) {
  try {
    const users = yield User.find({}, '-salt -password -token')
    return res.json({ payload: users })
  }
  catch (error) {
    error.status = 500
    return next(error)
  }
}

exports.postUser = function* (req, res, next) {
  try {
    const user = yield User.findOne({ email: req.body.email })
    if (!user) {
      const newUser = new User(req.body)
      yield newUser.hashPassword()
      yield newUser.save()
      return res.json({ payload: newUser })
    }
    const error = new Error('User already exists')
    error.status = 400
    next(error)
  }
  catch (error) {
    error.status = 500
    return next(error)
  }
}

exports.deleteUser = function* (req, res) {
  try {
    const user = yield User.findByIdAndRemove(req.params.id)
    return res.json({ payload: user })
  }
  catch (error) {
    error.status = 500
    next(error)
  }
}