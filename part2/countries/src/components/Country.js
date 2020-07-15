import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country}) => {
  const [ weather, setWeather ] = useState(null)
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    console.log(api_key)
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [])

  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>{country.languages.map(l => <li key={l.name}>{l.name}</li>)}</ul>
      <div><img width="20%" src={country.flag}  alt={country.name} /></div>
      {weather!==null && <div>
        <h2>Weather in {country.capital}</h2>
        <div>temperature {weather.current.temperature} Celsius</div>
        <div><img width="5%" src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]}/></div>
        <div>wind {weather.current.wind_speed} km/h, direction {weather.current.wind_dir}</div>
      </div>}
    </div>
  )
}

export default Country;