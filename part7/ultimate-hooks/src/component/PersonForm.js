import useField from "../hooks/useField"

const PersonForm = ({handlePersonSubmit}) => {
  const name = useField('text')
  const number = useField('text')

  const submitPerson = (event) => {
    event.preventDefault()
    handlePersonSubmit({ name: name.value, number: number.value})
  }
  return (
    <div>
      <form onSubmit={submitPerson}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
    </div>
  )
}

export default PersonForm