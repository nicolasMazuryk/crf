/**
 * Created by supervlad on 8/31/16.
 */

const
  mongoose = require('mongoose'),
  wrap = require('co-express'),
  crypto = require('crypto')

const generateSalt = (bytes = 128) => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(bytes, (err, salt) => {
      if (err) return reject(err)
      salt = new Buffer(salt).toString('hex')
      return resolve(salt)
    })
  })
}

const generateHash = (password, salt) => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 500, 128, 'sha512', (err, hash) => {
      if (err) return reject(err)
      hash = new Buffer(hash).toString('hex')
      return resolve(hash)
    })
  })
}

const User = new mongoose.Schema({

  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },

  salt: String

})

User.methods.hashPassword = function hashPassword() {
  const self = this
  return wrap(function* () {
    try {
      const salt = yield generateSalt()
      const hash = yield generateHash(self.password, salt)
      self.salt = salt
      self.password = hash
    }
    catch (error) {
      throw error
    }
  })()
}

User.methods.validatePassword = function validatePassword(password) {
  const self = this
  return wrap(function* (password) {
    try {
      const hash = yield generateHash(password, self.salt)
      return hash === self.password
    }
    catch (error) {
      throw error
    }
  })(password)
}

module.exports = mongoose.model('User', User)