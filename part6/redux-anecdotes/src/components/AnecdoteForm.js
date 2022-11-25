//import { useDispatch } from "react-redux"
import { connect } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import React from "react"
import { setNotification } from "../reducers/notificationReducer"

const AnecdotesForm = (props) => {
  //const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = {
      content: event.target.anecdote.value,
      votes:0
    }
    event.target.anecdote.value=''
    props.createAnecdote(anecdote)
    props.setNotification(`has creado la anecdota: ${anecdote.content}`,5000)
    //dispatch(createAnecdote(anecdote))
    //dispatch(setNotification(`has creado la anecdota: ${anecdote.content}`,2000))
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>

  )
}

export default connect(
  null,
  {
    createAnecdote,
    setNotification
  }
)(AnecdotesForm)
//export default AnecdotesForm