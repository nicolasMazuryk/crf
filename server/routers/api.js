/**
 * Created by supervlad on 8/31/16.
 */

const
  express = require('express'),
  User = require('../controllers/user'),
  Research = require('../controllers/research'),
  wrap = require('co-express'),
  router = express.Router()

router.route('/users')
  .get(wrap(User.getUsers))
  .post(wrap(User.postUser))

router.route('/users/:id')
  .delete(wrap(User.deleteUser))

router.route('/researches')
  .get(wrap(Research.getResearches))
  .post(wrap(Research.postResearch))

router.route('/researches/:id')
  .get(wrap(Research.getResearch))
  .delete(wrap(Research.deleteResearch))

module.exports = router