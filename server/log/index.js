/**
 * Created by supervlad on 8/19/16.
 */

const winston = require('winston')
const debug = process.argv.includes('debug')

const transports = [
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

debug && transports.push(new winston.transports.File({
  name: 'debug-file',
  filename: './server/log/debug.log',
  level: 'debug'
}))

module.exports = new winston.Logger({ transports })
