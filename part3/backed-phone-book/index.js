//importacion e instanciacion de la libreria express
const express = require('express')
const app = express()

//middleware morgan
const morgan = require('morgan')

//middleware para recibir en formato json la carga del body
app.use(express.json())

const morganMiddle = (tokens, request, response) =>{
    return [
        tokens.method(request,response),
        tokens.url(request,response),
        tokens.status(request,response),
        tokens.res(request,response,'content-length'),'-',
        tokens['response-time'](request,response),'ms',
        JSON.stringify(request.body),
    ].join(' ')
}

app.use(morgan(morganMiddle))

let persons = [
    {
        "name": "Arto Hellas",
        "number": "142-023-01-02",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "111-222-55-66",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]


app.get('/api/persons', (request, response) => {
    response.json(persons)
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

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }

})



app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    if (persons.find(p => p.id === id)) {
        persons = persons.filter(person => person.id !== id)
        response.status(204).end()
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (body.name && body.number) {
        if (!persons.find(p => p.name === body.name)) {
            const person = {
                name: body.name,
                number: body.number,
                id: Math.floor(Math.random() * 1000)
            }
            persons = persons.concat(person)
            response.json(person)
        } else {
            response.status(404).json({error:"El nombre de usuario ya existe"})
        }

    } else {
        response.status(404).json({error:"Falta el numero o el nombre de la persona"})
    }

})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})