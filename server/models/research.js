/**
 * Created by supervlad on 10/26/16.
 */

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Research = new Schema({

  name: { type: String, required: true },
  date_start: { type: Date, default: Date.now() },
  date_end: Date,
  clinics: { type: [Schema.Types.ObjectId], default: [] }

})

module.exports = mongoose.model('Research', Research)
