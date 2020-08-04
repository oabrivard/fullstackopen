const express = require('express')
const morgan = require('morgan')

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 2
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 3
    },
    {
        name: "Soiz",
        number: "2345",
        id: 4
    },
    {
        name: "oli",
        number: "2390",
        id: 5
    },
    {
        name: "titi",
        number: "1234",
        id: 6
    },
    {
        name: "toto",
        number: "12",
        id: 7
    }
]

const app = express()
app.use(express.json())

morgan.token('json_body', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json_body'))

app.get('/', (req, res) => {
    res.send('<h1>Phonebook backend</h1>')
})

app.get('/info', (req, res) => {
    const title = `Phonebook has info for ${persons.length} ${persons.length > 1 ? 'people' : 'person'}`
    const date = new Date().toString()
    res.send(`<p>${title}</<p><p>${date}</<p>`)
})

app.get('/api/persons', (req,res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        res.json(person)
    } else {
        res.sendStatus(404)
    }
})

app.delete('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
    res.sendStatus(204)
})

const getRandomID = () => Math.floor(Math.random() * Math.floor(10000))

app.post('/api/persons', (req,res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'name and number are mandatory'
        })
    }

    const existingPerson = persons.find(p => p.name === body.name)    
    if (existingPerson) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: getRandomID(),
    }

    persons = persons.concat(person)

    res.json(person)    
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const port = 3001

app.listen(port, () => {
  console.log(`Phonebook backend app listening at http://localhost:${port}`)
})