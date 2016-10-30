/**
 * Created by supervlad on 8/31/16.
 */

const
  express = require('express'),
  research = require('./research'),
  user = require('./user')

const api = express.Router({ mergeParams: true })

api.use('/researches', research)
api.use('/users', user)

module.exports = api