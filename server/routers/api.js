/**
 * Created by supervlad on 8/31/16.
 */

const
  express = require('express'),
  User = require('../controllers/user'),
  wrap = require('co-express'),
  router = express.Router()

router.route('/users')
  .get(wrap(User.getUsers))
  .post(wrap(User.postUser))

router.route('/users/:id')
  .delete(wrap(User.deleteUser))

module.exports = router