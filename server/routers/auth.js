/**
 * Created by supervlad on 9/1/16.
 */

const
  express = require('express'),
  wrap = require('co-express'),
  router = express.Router()

module.exports = (passport) => {

  router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (error, user) => {
      console.log(error)
      if (error) return next(error)
      wrap(function* () {
        try {
          yield user.generateToken()
          yield user.save()
          const { name, phone, role, token } = user
          console.log(user)
          const payload = { token, user: { name, phone, role } }
          return res.json({ payload })
        }
        catch (error) {
          return next(error)
        }
      })()
    })(req, res, next)
  })

  router.get('/logout', (req, res, next) => {
    passport.authenticate('bearer', { session: false }, (error, user) => {
      if (error) return next(error)
      wrap(function* () {
        try {
          user.token = ''
          yield user.save()
          res.json({ payload: true })
        }
        catch (error) {
          return next(error)
        }
      })()
    })(req, res, next)
  })

  return router
}