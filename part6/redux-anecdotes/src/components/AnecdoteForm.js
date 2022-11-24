import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import React from "react"
import { notificationEnd, notificationMake } from "../reducers/notificationReducer"

const AnecdotesForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value=''
    dispatch(createAnecdote(anecdote))
    dispatch(notificationMake(anecdote))
    setTimeout(() => {
      dispatch(notificationEnd())
    }, 5000);
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

export default AnecdotesForm