import React, { useState, useEffect } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import personService from "./services/person"
import Notification from "./components/Notification"



export const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newMessage, setNewMessage] = useState({ message: "error", type: null })


  const hook = () => {
    personService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    if (persons.includes(persons.find(person => person.name === personObject.name))) {
      updatePerson(personObject)
    } else if (personObject.number === '') {
      alert(`Agregue un numero para ${newName}`)
    } else {
      personService
        .addPerson(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewMessage({message:`El contacto ${returnedPerson.name} fue agregado correctamente`,type:"success"})
          setTimeout(() => {
            setNewMessage({ ...newMessage, type: "null" })
          }, 2000)
        }).catch(error => {
          const errorMsg = { message: `Error al agregar el contacto ${personObject.name}`, type: "error" }
          setNewMessage(errorMsg)
          setTimeout(() => {
            setNewMessage({ ...newMessage, type: "null" })
          }, 2000)
        })
      setNewName('')
      setNewNumber('')
    }

  }

  const updatePerson = (personObject) => {
    const person = persons.find(p => p.name === personObject.name);
    if (window.confirm(`${person.name} ya se encuentra agregado a la lista de contactos, ¿Quiere remplazar el antiguo numero por el numero numero?`)) {
      personService
        .updatePerson(person.id, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          setNewMessage({message:`El contacto ${returnedPerson.name} fue actualizado correctamente`,type:"success"})
          setTimeout(() => {
            setNewMessage({ ...newMessage, type: "null" })
          }, 2000)
        }).catch(error => {
          const errorMsg = { message: `Error al actualizar, el contacto ${person.name} fue eliminado del servidor`, type: "error" }
          setNewMessage(errorMsg)
          setTimeout(() => {
            setNewMessage({ ...newMessage, type: "null" })
          }, 2000)
        })
      setPersons(persons.filter(p => p.id !== person.id))
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

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id);
    if (window.confirm(`Quieres eliminar a ${person.name} ?`)) {
      personService
        .deletePerson(id)
        .then(returnedPersons => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={newMessage} />
      <Filter newFilter={newFilter} handleFilter={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} deletePerson={deletePerson} />
    </div>
  )
}

export default App;
