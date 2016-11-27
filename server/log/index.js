/**
 * Created by supervlad on 8/19/16.
 */

const winston = require('winston')

module.exports = new winston.Logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      name: 'error-file',
      filename: './server/log/error.log',
      level: 'error'
    })
  ]
})

