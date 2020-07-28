import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [ newFilter, setNewFilter ] = useState('')
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  
  useEffect(() => {
    console.log('effect')
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
      })
  }, [])

  const handleFilterChange = event => {
    setNewFilter(event.target.value)
  }

  const addPerson = event => {
    event.preventDefault()

    if (persons.some(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name : newName,
        number : newNumber
      }

      personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
    }

    setNewName('')
    setNewNumber('')
  }
  
  const handlePersonChange = event => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <div>debug: {newName}</div>
      <h3>Numbers</h3>
      <Persons persons={persons} newFilter={newFilter} />
    </div>
  )
}

export default App