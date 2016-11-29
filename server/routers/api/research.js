/**
 * Created by supervlad on 10/30/16.
 */

const
  express = require('express'),
  Research = require('../../controllers/research'),
  co = require('co'),
  router = express.Router(),
  clinic = require('./clinic')

router.use('/:rid/clinics', clinic)

router.route('/')
  .get(co.wrap(Research.getResearches))
  .post(co.wrap(Research.postResearch))

router.route('/:rid')
  .get(co.wrap(Research.getResearch))
  .delete(co.wrap(Research.deleteResearch))

module.exports = router
