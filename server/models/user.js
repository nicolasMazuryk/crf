/**
 * Created by supervlad on 8/31/16.
 */

const
  mongoose = require('mongoose'),
  co = require('co'),
  crypto = require('crypto'),
  jwt = require('jsonwebtoken')

const roles = ['admin', 'coordinator', 'doctor']

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

const signToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, 'key_secret', { expiresIn: '12h' }, (error, token) => {
      if(error) return reject(error)
      return resolve(token)
    })
  })
}

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'key_secret', (err, decoded) => {
      if (err) return reject(err)
      return resolve(decoded)
    })
  })
}

const User = new mongoose.Schema({

  phone: { type: Number, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: {
    type: String,
    validate: {
      validator: (role) => roles.includes(role),
      message: '{VALUE} is not a valid user role'
    },
    required: true
  },

  salt: String,
  token: { type: String, default: '' }

})

User.methods.hashPassword = function hashPassword() {
  const self = this
  return co(function* () {
    const salt = yield generateSalt()
    const hash = yield generateHash(self.password, salt)
    self.salt = salt
    self.password = hash
  })
}

User.methods.validatePassword = function validatePassword(password) {
  const self = this
  return co(function* () {
    const hash = yield generateHash(password, self.salt)
    return hash === self.password
  })
}

User.methods.generateToken = function generateToken() {
  const self = this
  return co(function* () {
    const token = yield signToken({ id: self._id, phone: self.phone, role: self.role })
    self.token = token
    return token
  })
}

User.methods.validateToken = function validateToken(token) {
  const self = this
  return co(function* () {
    const { id, phone, role } = yield verifyToken(token)
    return id === self._id && phone === self.phone && role === self.role
  })
}

module.exports = mongoose.model('User', User)
