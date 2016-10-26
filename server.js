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
  path = require('path'),
  passport = require('./server/controllers/auth'),

  APIRoute = require('./server/routers/api'),
  authRoute = require('./server/routers/auth')

const env = process.env.NODE_ENV || 'development'
const app = express()

mongoose.Promise = global.Promise

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
app.use(passport.initialize())
app.use(authRoute(passport))
app.use('/api/', APIRoute)
app.use((err, req, res, next) => {
  const isMongoError = ['ValidationError', 'CastError'].includes(err.name)
  isMongoError && (err.status = 400)
  if (!err.status) {
    logger.error(err)
  }
  res.status(err.status || 500).json({ error: err })
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

mongoose.connect(config[env].db_url, err => {
  if (err) return logger.error(err)
  logger.info('Connected to db: %s', config[env].db_url)
})

app.listen(config[env].port, err => {
  if (err) return logger.error(err)
  logger.info('Server started at %d', config[env].port)
})