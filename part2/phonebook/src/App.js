import React, { useState, useEffect} from "react"
import axios from "axios"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import  Persons  from "./components/Persons"

export const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {
    axios
    .get('http://localhost:3001/persons')
    .then(response =>{
      const persons = response.data
      setPersons(persons)
    })
  }

  useEffect(hook,[])

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
