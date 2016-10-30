/**
 * Created by supervlad on 9/1/16.
 */

const
  passport = require('passport'),
  User = require('../models/user'),
  co = require('co'),
  BearerStrategy = require('passport-http-bearer').Strategy,
  LocalStrategy = require('passport-local').Strategy,
  errors = require('../error/')

const local = function* (phone, password, done) {
  try {
    const user = yield User.findOne({ phone })
    if (!user) {
      return done(new errors.NotFound('Wrong phone or password'))
    }
    const isValid = yield user.validatePassword(password)
    if (!isValid) {
      return done(new errors.NotFound('Wrong phone or password'))
    }
    done(null, user)
  }
  catch (error) {
    done(error)
  }
}

const bearer = function* (token, done) {
  try {
    const user = yield User.findOne({ token })
    if (!user) {
      return done(new errors.Unauthorized('Unauthorized'))
    }
    yield user.validateToken(token)
    return done(null, user)
  }
  catch (error) {
    done(error)
  }
}

passport.use('local', new LocalStrategy({ usernameField: 'phone' }, co.wrap(local)))
passport.use('bearer', new BearerStrategy(co.wrap(bearer)))

module.exports = passport