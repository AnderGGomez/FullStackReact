import { /*useDispatch, useSelector,*/ connect } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import React from "react"

const AnecdoteList = (props) => {
  //const dispatch = useDispatch()
  //const filter = useSelector(state => state.filter )
  /*const anecdotes = useSelector(state => state.anecdote
                      .filter(anec=>anec.content.toLowerCase().includes(filter.toLowerCase()))
                      .sort((a,b)=> b.votes - a.votes))
  */
  const vote = (anecdote) =>{
    props.voteAnecdote(anecdote.id)
    props.setNotification(`has votado por: ${anecdote.content}`,5000)
    //dispatch(voteAnecdote(anecdote.id))
    //dispatch(setNotification(`has votado por: ${anecdote.content}`,2000))
    
  }

  return (
    <div>
      {props.anecdotes.map(anecdote => 
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdote
      .filter(anec => anec.content.toLowerCase().includes(state.filter.toLowerCase()))
      .sort((a,b)=>b.votes-a.votes),
    notification: state.notification,
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification,
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
  )(AnecdoteList)

export default ConnectedAnecdotes