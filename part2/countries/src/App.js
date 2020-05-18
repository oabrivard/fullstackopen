import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import Countries from './components/Countries'
import axios from 'axios'

const App = () => {
  const [ newSearch, setNewSearch ] = useState('')
  const [ countries, setCountries ] = useState([]) 
  
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = event => {
    setNewSearch(event.target.value)
  }
  
  return (
    <div>
      <Search newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <Countries countries={countries} newSearch={newSearch} />
    </div>
  )
}

export default App;
