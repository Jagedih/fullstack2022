import React, { useState, } from 'react'
import axios from 'axios'

const FilterButton = ({setNewFilter, name}) =>{
  const clickFunction =() =>{
    setNewFilter(name)
  }
  return(
    <button onClick={clickFunction}>show</button>
  )
}
const Country = ({country, showDetails, setNewFilter})=>{
  if(!showDetails){
    return(
    <div>
      {country.name}
      <FilterButton setNewFilter = {setNewFilter} name={country.name} />
    </div>
    )
  }
  else{
    return(
      <div>
        <h1>{country.name}</h1>
        Capital:
        {country.capital}
        <br></br>
        Population: 
        {country.population}
        <br></br>
        <h2>Languages</h2>
        <ul>
          {country.languages.map(language =><li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={country.flag} alt={country.name} width={150} height={75} />
      </div>
    )
  }
}
const CountryList = ({condOperator, setNewFilter}) =>{
  const filteredCountries = []

  filteredCountries.push(condOperator.map(country =>country.name))

  if(filteredCountries[0].length > 10){
    return <div>Too many matches, specify another filter</div>
  }

  else if(filteredCountries[0].length >1 && filteredCountries[0].length <=10){
    return(
      <div>
        {condOperator.map(country =><Country 
        country={country} 
        key={country.name} 
        showDetails={false} 
        setNewFilter={setNewFilter}
        />)}
      </div>
      )
  }
  else{
    return(
      <div>
      {condOperator.map(country =><Country country={country}  key={country.name} showDetails={true} />)}
    </div>
    )
  }
}
const Filter = ({changeHandler, filterWord}) =>{
    return (
    <div>
        search by name:
        <input onChange={changeHandler} value={filterWord} />
    </div>)
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  
  axios.get('https://restcountries.eu/rest/v2/all').then(response => {
    setCountries(response.data)
  })

  const handleFilterChange = (event) => setNewFilter(event.target.value)

  const countriesToShow = newFilter === ''
    ? countries
    : countries.filter(country =>country.name.includes(newFilter))

    return(
    <div>
        <Filter changeHandler={handleFilterChange} filterWord={newFilter} /> 
        <CountryList condOperator={countriesToShow} setNewFilter={setNewFilter} />
    </div>
  )
}
export default App