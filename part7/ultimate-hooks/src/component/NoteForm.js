import useField from "../hooks/useField"
const NoteForm = ({handleNoteSubmit}) => {
  const content = useField('text')

  const submitNote = (event) => {
    console.log(content)
    event.preventDefault()
    handleNoteSubmit({ content: content.value })
  }
  return (
    <div>
      <form onSubmit={submitNote}>
        <input {...content} />
        <button>create</button>
      </form>
    </div>

  )
}

export default NoteForm