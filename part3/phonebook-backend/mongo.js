const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Wrong number of arguments\n' +
  'To list entries: node mongo.js [password]\n' +
  'To add a new entry: node mongo.js [password] [name] [number]')
  process.exit(1)
}

const [,, password, name, number] = process.argv
const url = `mongodb+srv://oabrivard:${password}@fullstackopen.6kr6n.mongodb.net/phonebook-app?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log('Phonebook:')
        result.forEach(p => {
          console.log(`${p.name} ${p.number}`)
        })
        mongoose.connection.close()
    })    
} else {
    if (!name || !number) {
        console.log('name and number are mandatory')
        mongoose.connection.close()
        process.exit(1)
    }

    const person = new Person({name, number})
    
    person.save().then(result => {
        console.log(`Added ${name} with number ${number} to phonebook`)
        mongoose.connection.close()
    })      
}
