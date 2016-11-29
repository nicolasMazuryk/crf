/**
 * Created by supervlad on 10/30/16.
 */

const
  express = require('express'),
  Clinic = require('../../controllers/clinic'),
  co = require('co'),
  router = express.Router({ mergeParams: true })

router.route('/')
  .get(co.wrap(Clinic.getClinics))
  .post(co.wrap(Clinic.postClinic))

router.route('/:cid')
  .delete(co.wrap(Clinic.deleteClinic))

module.exports = router
