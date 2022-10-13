/*Se exporta el enrutador para que este disponible para todos
los consumidores del modulo*/
const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

personsRouter.get('/info', (request, respose) => {
  Person.find({}).count((err,count) => {
    if(!err){
      const info = {
        message: `Phonebook has info for ${count}`,
        date: `${new Date()}`
      }
      respose.send(`
        <p>${info.message}</p>
        <p>${info.date}</p>
      `)
    }
  })
})

personsRouter.get('/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      person ? response.json(person) : response.status(404).end()
    })
    .catch(error => next(error))
})



personsRouter.delete('/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

personsRouter.post('/', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(personSave => {
      response.json(personSave)
    })
    .catch(error => next(error))
})

personsRouter.put('/:id', (request, response, next) => {
  const body = request.body
  const id = request.params.id
  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(id, person, { new: true, runValidators: true })
    .then(updatePerson => {
      response.json(updatePerson)
    })
    .catch(error => next(error))
})

module.exports = personsRouter