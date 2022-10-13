const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch(error=>{
    logger.error('Error connecting to MongoDB', error.message)
  })

app.use(cors())
app.use(express.json())
app.use('/api/blogs',blogsRouter)

module.exports=app