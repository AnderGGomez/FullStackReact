
//Variables de entorno
require('dotenv').config()

//cors
const cors = require('cors')
//importacion e instanciacion de la libreria express
const express = require('express')
const app = express()
//morgan
const morgan = require('morgan')

//import model Person
const Person = require('./models/person')

//----Midleware's----

//middleware para recibir en formato json la carga del body
app.use(express.json())
app.use(express.static('build'))
app.use(cors())


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

app.use(morgan(morganMiddle))


app.get('/api/persons', (request, response) => {
    //response.json(persons)
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', (request, respose) => {
    const info = {
        message: `Phonebook has info for ${persons.length}`,
        date: `${new Date()}`
    }
    respose.send(`
        <p>${info.message}</p>
        <p>${info.date}</p>
    `)
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            person ? response.json(person) : response.status(404).end()
        })
        .catch(error => next(error))
})



app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result =>{
        response.status(204).end()
    })
    .catch(error=>next(error))
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (body.name && body.number) {
        //        if (!existPerson.name == body.name) {
        const person = new Person({
            name: body.name,
            number: body.number
        })
        person.save().then(personSave => {
            response.json(personSave)
        })
        /*        } else {
                    response.status(404).json({error:"El nombre de usuario ya existe"})
                }*/

    } else {
        response.status(404).json({ error: "Falta el numero o el nombre de la persona" })
    }

})

app.put('/api/persons/:id',(request, response, next)=>{
    const body = request.body
    const id = request.params.id
    const person = {
        name : body.name,
        number : body.number,
    }
    Person.findByIdAndUpdate(id,person,{new:true})
    .then(updatePerson=>{
        response.json(updatePerson)
    })
    .catch(error=>next(error))
})

//-----Middleware-----


//unknown end point middleware
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

//error middleware
const errorHandler = (error, request, response, next) => {
    console.log(error)
    if (error.name === 'CastError') {
        response.status(400).send({ error: "malformed id" })
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})