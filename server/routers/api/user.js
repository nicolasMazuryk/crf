/**
 * Created by supervlad on 10/30/16.
 */

const
  express = require('express'),
  User = require('../../controllers/user'),
  co = require('co'),
  router = express.Router()

router.route('/')
  .get(co.wrap(User.getUsers))
  .post(co.wrap(User.postUser))

router.route('/:id')
  .delete(co.wrap(User.deleteUser))

module.exports = router
