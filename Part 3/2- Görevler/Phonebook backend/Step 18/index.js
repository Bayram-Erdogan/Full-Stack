require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan');
const cors = require('cors')
const Person = require('./models/person')

morgan.token('body', (req) => JSON.stringify(req.body));
const logsData = ':method :url :status :response-time ms - :res[content-length] :body';

app.use(cors())
app.use(express.json());
app.use(morgan(logsData))
app.use(express.static('dist'))

let persons = []

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
  })

app.get('/info', (request, response, next) => {
    Person.countDocuments({})
      .then(count => {
        const currentTime = new Date();
        response.send(`
          <p>Phonebook has info for ${count} people</p>
          <p>${currentTime}</p>
        `);
      })
      .catch(error => next(error));
  });


app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
  })

app.delete('/api/persons/:id', (request, response,next) => {
  Person.findByIdAndDelete(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
  })

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number are missing '
    })
  } else if( persons.find(person => person.name === body.name)){
    return response.status(400).json({
     error: 'name must be unique'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then(savedPerson =>{
      response.json(savedPerson)
    })
  });

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
      name: body.name,
      number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person)
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
  })

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})

