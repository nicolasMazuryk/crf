/**
 * Created by supervlad on 8/19/16.
 */

const
  express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  logger = require('./server/log'),
  winstonRequestLogger = require('winston-request-logger'),
  config = require('./config'),
  path = require('path')

const env = process.env.NODE_ENV || 'development'
const app = express()

app.use(express.static(path.join(__dirname, config[env].public)))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({extended: true}))
app.use(winstonRequestLogger.create(logger, {
  'date': ':date',
  'statusCode': ':statusCode',
  'method': ':method',
  'url': ':url[pathname]',
  'responseTime': ':responseTime ms'
}))

mongoose.connect(config[env].db_url, err => {
  if(err) return logger.error('DB connection error %j', err)
  logger.info('Connected to db: %s', config[env].db_url)
})

app.listen(config[env].port, err => {
  if(err) return logger.error('Server start error %j', err)
  logger.info('Server started at %d', config[env].port)
})