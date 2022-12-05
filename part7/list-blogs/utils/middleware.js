const logger = require('./logger')
const errorHandler = (error, request,response, next) => {
  if (error.name === 'CastError'){
    return response.status(404).json({error: error.message})
  }else if (error.name === 'ValidationError'){
    return response.status(400).json({error: error.errors['username'].message})
  }else if (error.name === 'JsonWebTokenError'){
    return response.status(401).json({error:'invalid token'})
  }

  logger.error(error.message)
  
  next(error)
}

const tokenExtractor = (request,response, next) => {
  const authorization =  request.get('authorization')
  if(authorization){
    const tkn = authorization.split(' ')
    request.token = tkn[1]
  }
  next()
}

module.exports = {
  errorHandler,
  tokenExtractor
}