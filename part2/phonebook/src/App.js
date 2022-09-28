import React, { useState } from "react"


const Person = ({person}) => {
  return (
    <li>{person.name}</li>
  )
}
export const App=()=>{
  const [ persons, setPersons ] = useState([
    { id:1, name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addNote = (event) =>{
    event.preventDefault()
    if(persons.includes(persons.find(person => person.name === newName))){
      alert(`${newName} ya fue agregado a la lista`)
    }else{
      const personObject = {
      id: persons.length + 1,
      name: newName,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    }
    
  }

  const handleNoteChange = (event) =>{
    setNewName(event.target.value)
  }
  return (
    <div>debug:{newName}
      <h2>Phonebook</h2>
      <form onSubmit={addNote}>
        <div>
          name: <input value={newName} onChange={handleNoteChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
      {persons.map(person=>(
        <Person key={person.id} person={person} />)
        )}
      </ul>
      
    </div>
  )
}

export default App;
