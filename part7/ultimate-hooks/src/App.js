import useResource from './hooks/useResource'
import NoteForm from './component/NoteForm'
import PersonForm from './component/PersonForm'



const App = () => {
  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')
  
  const handleNoteSubmit = (noteObj) => {
    noteService.create(noteObj)
  }
 
  const handlePersonSubmit = (personObj) => {
    personService.create(personObj)
  }

  return (
    <div>
      <h2>notes</h2>
      <NoteForm handleNoteSubmit={handleNoteSubmit}/>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <PersonForm handlePersonSubmit={handlePersonSubmit}/>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App