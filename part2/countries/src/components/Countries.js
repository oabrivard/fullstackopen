import React, { useState } from 'react';

const Country = ({country}) => <div>
  <h1>{country.name}</h1>
<div>capital {country.capital}</div>
<div>population {country.population}</div>
<h2>languages</h2>
<ul>{country.languages.map(l => <li key={l.name}>{l.name}</li>)}</ul>
<div><img width="20%" src={country.flag}  alt={country.name} /></div>
</div>

const Countries = ({countries,newSearch}) => {
  const [ countryShown, setCountryShown ] = useState(null)

  const filteredCountries = countries.filter(c => c.name.toLowerCase().includes(newSearch.toLowerCase()))

  if (filteredCountries.length > 10) {
    return (<div>Too many matches, specify another filter</div>)
  } else if (filteredCountries.length === 1) {
    return (<Country country={filteredCountries[0]} />)
  } else if (filteredCountries.length === 0) {
    return(<div>No match found</div>)
  }

  return (
    <div>
      <div>
        {filteredCountries.map(c => <div key={c.name}>{c.name} <button onClick={(e) => setCountryShown(c)}>show</button> </div>)}
      </div>
      {countryShown!==null &&
      <div>
        <Country country={countryShown} />
      </div>}
    </div>
  );
};

export default Countries;