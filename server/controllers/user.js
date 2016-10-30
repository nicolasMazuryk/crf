/**
 * Created by supervlad on 8/31/16.
 */

const
  User = require('../models/user'),
  errors = require('../error/')

exports.getUsers = function* (req, res, next) {
  try {
    const users = yield User.find({}, '-salt -password -token')
    return res.json({ payload: users })
  }
  catch (error) {
    return next(error)
  }
}

exports.postUser = function* (req, res, next) {
  try {
    const user = yield User.findOne({ email: req.body.email }, '-salt -password -token')
    if (user) {
      return next(new errors.BadRequest('User already exists'))
    }
    const newUser = new User(req.body)
    yield newUser.hashPassword()
    yield newUser.save()
    return res.json({ payload: newUser })
  }
  catch (error) {
    return next(error)
  }
}

exports.deleteUser = function* (req, res, next) {
  try {
    const user = yield User.findByIdAndRemove(req.params.id)
    return res.json({ payload: user })
  }
  catch (error) {
    return next(error)
  }
}
