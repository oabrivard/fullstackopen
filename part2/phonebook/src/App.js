import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ newFilter, setNewFilter ] = useState('')
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [notification, setNotification] = useState(null)
  
  useEffect(() => {
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

    const person = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
    if (person) {
      setNotification({
        type: 'error',
        message: `${newName} is already added to phonebook`
      })

      setTimeout(() => {setNotification(null)}, 5000)
    } else {
      const newPerson = {
        name : newName,
        number : newNumber
      }

      personService
      .create(newPerson)
      .then(returnedPerson => {
        setNotification({
          type: 'success',
          message: `Added '${returnedPerson.name}'`
        })
        setTimeout(() => {setNotification(null)}, 5000)
        setPersons(persons.concat(returnedPerson))
      })
      .catch(error => {
        const errorMessage = error?.response?.data?.error || 'an error occured on the server'
        setNotification({
          type: 'error',
          message: errorMessage
        })
        setTimeout(() => {setNotification(null)}, 5000)
        if (error?.response?.status===404) {
          setPersons(persons.filter(p => p.id !== person.id))
        }
      })   
    }

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = id => {
    const person = persons.find(p => p.id === id)

    if (! window.confirm(`Delete ${person.name} ?`)) { 
      return
    }

    personService
    .suppress(id)
    .then(data => {
      console.log(data)
      setPersons(persons.filter(p => p.id !== id))
    })
    .catch(error => {
      setNotification({
        type: 'error',
        message: `the person '${person.name}' was already deleted from server`
      })
      setTimeout(() => {setNotification(null)}, 5000)
      setPersons(persons.filter(p => p.id !== id))
    })      
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
      <Notification notification={notification} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} newFilter={newFilter} deletePerson={deletePerson}/>
    </div>
  )
}

export default App