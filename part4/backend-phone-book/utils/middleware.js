const morganMiddle = (tokens, request, response) => {
  return [
    tokens.method(request, response),
    tokens.url(request, response),
    tokens.status(request, response),
    tokens.res(request, response, 'content-length'), '-',
    tokens['response-time'](request, response), 'ms',
    JSON.stringify(request.body),
  ].join(' ')
}

//unknown end point middleware
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


//error middleware
const errorHandler = (error, request, response, next) => {
  console.log(error)
  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformed id' })
  } else if (error.name === 'ValidationError') {
    response.status(400).send({ error: error.message })
  }
  next(error)
}

module.exports = {
  morganMiddle,
  unknownEndpoint,
  errorHandler
}
