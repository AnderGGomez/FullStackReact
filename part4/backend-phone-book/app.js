const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const personsRouter = require('./controllers/persons')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to',config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB',error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(middleware.morganMiddle))
//app.use(middleware.requestLogger)

app.use('/api/persons',personsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports=app