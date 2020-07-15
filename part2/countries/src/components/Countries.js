import React, { useState } from 'react'
import Country from './Country'

const Countries = ({countries,newSearch}) => {
  const [ country, setCountry ] = useState(null)
  const filteredCountries = countries.filter(c => c.name.toLowerCase().includes(newSearch.toLowerCase()))

  if (filteredCountries.length > 10) {
    return (<div>Too many matches, specify another filter</div>)
  } else if (filteredCountries.length === 1) {
    return (<Country country={filteredCountries[0]}/>)
  } else if (filteredCountries.length === 0) {
    return(<div>No match found</div>)
  } else {
    return (
        <div>
          {filteredCountries.map(c => <div key={c.name}>{c.name} <button onClick={(e) => setCountry(c)}>show</button> </div>)}
          {country!==null && <Country country={country} />}
        </div>
    )
  }
}

export default Countries;