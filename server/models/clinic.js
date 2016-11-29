/**
 * Created by supervlad on 10/26/16.
 */

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Clinic = new Schema({

  name: { type: String, required: true },
  address: { type: String },
  doctors: { type: [Schema.Types.ObjectId], default: [] }

})

module.exports = mongoose.model('Clinic', Clinic)
