/**
 * Created by supervlad on 10/26/16.
 */

const
  Clinic = require('../models/clinic'),
  Research = require('../models/research')

exports.getClinics = function* (req, res, next) {
  try {
    const rid = req.params.rid
    const { clinics: clinicsIds } = yield Research.findById(rid, 'clinics')
    const clinics = yield clinicsIds.map(id => Clinic.findById(id))
    res.json({ payload: clinics })
  }
  catch (error) {
    next(error)
  }
}

exports.postClinic = function* (req, res, next) {
  try {
    const id = req.params.rid
    const newClinic = new Clinic(req.body)
    yield Research.findByIdAndUpdate(id, { $push: { clinics: newClinic._id } })
    yield newClinic.save()
    res.json({ payload: newClinic })
  }
  catch (error) {
    next(error)
  }
}

exports.deleteClinic = function* (req, res, next) {
  try {
    const rid = req.params.rid
    const cid = req.params.cid
    const [ deleted ] = [
      yield Clinic.findByIdAndRemove(cid),
      yield Research.findByIdAndUpdate(rid, { $pull: { clinics: cid } })
    ]
    res.json({ payload: deleted })
  }
  catch (error) {
    next(error)
  }
}
