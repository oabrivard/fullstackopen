require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

morgan.token('json_body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json_body'))

app.get('/', (req, res) => {
    res.send('<h1>Phonebook backend</h1>')
})

app.get('/info', (req, res) => {
    Person.find({}).then(persons => {
        const title = `Phonebook has info for ${persons.length} ${persons.length > 1 ? 'people' : 'person'}`
        const date = new Date().toString()
        res.send(`<p>${title}</<p><p>${date}</<p>`)
    })
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id).then(person => {
        if (person) {
            res.json(person)
        } else {
            res.sendStatus(404)
        }
    }).catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id).then(result => {
        res.status(204).end()
    }).catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(savedPerson => {
            res.json(savedPerson)
        })
        .catch(error => {
            next(error)
        })
})

app.put('/api/persons/:id', function (req, res, next) {
    const body = req.body

    if (!body.name || !body.number) {
        var e = new Error('name and number are mandatory')
        e.name = 'ParameterError'
        next(e)
    }

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
            if (!updatedPerson) {
                var e = new Error(`the person '${body.name}' was already deleted from server`)
                e.name = 'AlreadyDeletedError'
                throw e
            }

            res.json(updatedPerson)
        }).catch(error => {
            next(error)
        })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    switch (error.name) {
        case 'CastError':
            return response.status(400).send({ error: 'malformatted id' })
        case 'ValidationError':
        case 'AlreadyExistsError':
        case 'ParameterError':
            return response.status(400).send({ error: error.message })
        case 'AlreadyDeletedError':
            return response.status(404).send({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Phonebook backend app listening at http://localhost:${PORT}`)
})