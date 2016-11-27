/**
 * Created by supervlad on 10/26/16.
 */

const checkError = (err) => {
  switch (err.name) {
    case 'ValidationError':
    case 'CastError':
      return new BadRequest(`${err.message}. ${err.errors.name.message}`)
    case 'TokenExpiredError':
      return new Unauthorized(`${err.message}. Expired at ${err.expiredAt}`)
    default:
      return false
  }
}

function NotFound (message) {
  this.name = 'Not Found'
  this.status = 404
  this.message = message
  Error.call(this, message)
  Error.captureStackTrace(this, NotFound)
}

NotFound.prototype = Object.create(Error.prototype)

function BadRequest (message) {
  this.name = 'Bad Request'
  this.status = 400
  this.message = message
  Error.call(this, message)
  Error.captureStackTrace(this, BadRequest)
}

BadRequest.prototype = Object.create(Error.prototype)

function Unauthorized (message) {
  this.name = 'Unauthorized'
  this.status = 401
  this.message = message
  Error.call(this, message)
  Error.captureStackTrace(this, Unauthorized)
}

Unauthorized.prototype = Object.create(Error.prototype)

module.exports = { Unauthorized, NotFound, BadRequest, checkError }