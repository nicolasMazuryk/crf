/**
 * Created by supervlad on 8/31/16.
 */

const mongoose = require('mongoose')

const User = new mongoose.Schema({

  name: String

})

module.exports = mongoose.model('User', User)