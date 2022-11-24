import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { notificationEnd, notificationVote } from "../reducers/notificationReducer"
import React from "react"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter )
  const anecdotes = useSelector(state => state.anecdote
                      .filter(anec=>anec.content.toLowerCase().includes(filter.toLowerCase()))
                      .sort((a,b)=> b.votes - a.votes))
  
  const vote = (anecdote) =>{
    dispatch(voteAnecdote(anecdote.id))
    dispatch(notificationVote(anecdote.content))
    setTimeout(() => {
      dispatch(notificationEnd())
    }, 5000);
  }

  console.log(anecdotes.filter(a=>a.content.toLowerCase().includes(filter.toLowerCase())))
  return (
    <div>
      {anecdotes.map(anecdote => 
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
        )}
    </div>
  )
}


export default AnecdoteList