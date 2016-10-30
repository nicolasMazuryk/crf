/**
 * Created by supervlad on 10/26/16.
 */

const
  Research = require('../models/research'),
  errors = require('../error/')

exports.getResearches = function* (req, res, next) {
  try {
    const researches = yield Research.find()
    return res.json({ payload: researches })
  }
  catch (error) {
    next(error)
  }
}

exports.getResearch = function* (req, res, next) {
  const id = req.params.id
  try {
    const research = yield Research.findById(id)
    return res.json({ payload: research })
  }
  catch (error) {
    next(error)
  }
}

exports.postResearch = function* (req, res, next) {
  try {
    const newResearch = new Research(req.body)
    yield newResearch.save()
    res.json({ payload: newResearch })
  }
  catch (error) {
    next(error)
  }
}

exports.deleteResearch = function* (req, res, next) {
  const id = req.params.id
  try {
    const removed = yield Research.findByIdAndRemove(id)
    res.json({ payload: removed })
  }
  catch (error) {
    next(error)
  }
}
