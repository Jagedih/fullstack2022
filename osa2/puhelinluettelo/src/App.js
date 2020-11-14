import React, { useState, useEffect } from 'react'
import personService from './services/persons'
const Person = ({name, number})=><span>{name} - {number}</span>

const PersonList = ({condOperator, setPersons, setSuccessMessage}) =>{
    const deletePerson = (id)=>{
        if (window.confirm("Delete name from phonebook?")) {
            // console.log("id",id)
            personService
            .remove(id)
            .then(response => {personService
                .getAll()
                .then(response => {
                    setPersons(response)
                })
            })
            setSuccessMessage(`delete successfull`)
            setTimeout(() => {
                setSuccessMessage(null)
            }, 5000)
        }
    }
    return(
        condOperator.map(person =><div key={person.name}>
            <Person name={person.name} number={person.number}/>
            <button onClick={()=>deletePerson(person.id)}>-</button>
            </div>
        )
    )
}
const Notification = ({ message, typeIsError }) => {
    if (message === null) {
      return null
    }
    else if(typeIsError){
        return (
        <div class='error'>
            {message}
        </div>)
    }
    else{
        return(
        <div class='succ'>
            {message}
        </div>)
    }
}
const Filter = ({changeHandler, filterWord}) =>{
    return (
    <div>
        filter by name:
        <input onChange={changeHandler} value={filterWord} />
    </div>)
}
const NameNumForm = (
    {handleSubmitForm, 
    newName, 
    handleNameChange, 
    newNumber, 
    handleNumberChange} ) => {
        return(
        <form onSubmit={handleSubmitForm}>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  
  //initial data fetch
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)
  const getNotes = () => {
    personService
    .getAll()
    .then(response => {
      setPersons(response)
    })
  }
  //filter persons with given name
  const personsToShow = newFilter === ''
  ? persons: 
  persons.filter(person =>person.name.includes(newFilter))
  
  //handles person&number submission
  const handleSubmitForm = (event) => {
      event.preventDefault()
      if(persons.map(person =>person.name).includes(newName)){
          if(window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)){
              const personObj = persons.find(p => p.name === newName)
              const newPerson = {...personObj, number: newNumber }

              personService.update(newPerson.id,newPerson).then(response =>{
                  setPersons(persons.map(person => person.name !== newName ? person : response))
                  setSuccessMessage(`${newName} Information updated`)
                  setTimeout(() => {
                    setSuccessMessage(null)
                }, 5000)
                }).catch(error => {
                setErrorMessage(`${newName} has already been removed from the server... updating list.`)})
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                getNotes()
                setNewNumber('')
                setNewName('')
            }
        }
        else{
            const newPerson = {name: newName, number: newNumber}
            personService.create(newPerson).then(response => setPersons(persons.concat(response)))
            setSuccessMessage(`${newName} added to phonebook`)
            setTimeout(() => {
                setSuccessMessage(null)
            }, 5000)

            setNewNumber('')
            setNewName('')
        }
    }
    return(
    <div>
        <h2>Phonebook</h2>
        <Notification message={errorMessage} typeIsError = {true}/>
        <Notification message={successMessage} typeIsError = {false}/>
        <Filter changeHandler={handleFilterChange} filterWord={newFilter} /> 
        <h2>Add a new</h2>
        <NameNumForm 
        handleSubmitForm={handleSubmitForm} 
        newName={newName} 
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} 
        />
        <h2>Numbers</h2>
        <PersonList condOperator={personsToShow} persons ={persons} setPersons={setPersons} setSuccessMessage = {setSuccessMessage}/>
    </div>
  )
}
export default App