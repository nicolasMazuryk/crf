/**
 * Created by supervlad on 8/19/16.
 */

const winston = require('winston')
const debug = process.argv.includes('debug')

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      colorize: true,
      level: 'info'
    }),
    new winston.transports.File({
      name: 'error-file',
      filename: './server/log/error.log',
      level: 'error'
    })
  ]
})

debug && logger.add(new winston.transports.Console({
  colorize: true,
  level: 'debug'
}))

module.exports = logger
