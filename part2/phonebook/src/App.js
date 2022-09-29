import React, { useState } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import { Persons } from "./components/Persons"

/*const Person = ({ person }) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}*/

/*
const Filter = ({ persons, filter }) => {
  
  return (
    <div>
      {persons.filter(person => 
          person.name.toLowerCase().includes(filter.toLowerCase()))
          .map(person=>(<Person key={person.name} person={person}/>))
      }
    </div>

  )
}*/


export const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '573112221515' },
    { name: 'Maria', number: '573132221515' },
    { name: 'Pedro', number: '573142221515' },
    { name: 'Juan', number: '573152221515' },
    { name: 'Felix', number: '573162221515' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.includes(persons.find(person => person.name === newName))) {
      alert(`${newName} ya fue agregado a la lista`)
    } else if (newNumber === '') {
      alert(`Agregue un numero para ${newName}`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilter={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter}/>
      
    </div>
  )
}

export default App;
