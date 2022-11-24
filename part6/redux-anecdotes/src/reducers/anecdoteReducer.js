import anecdoteService from "../services/anecdotes";

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE':
      const id = action.data.id
      return state.map(anecdote => anecdote.id !== id ? anecdote : action.data)
    case 'INITIAL_DATA':
      return action.data
    default:
      return state
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const anecdoteSaved = await anecdoteService.addAnecdote(anecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: anecdoteSaved
    })
  }
  /*return {
    type: 'NEW_ANECDOTE',
    data : anecdote
  }*/
}
export const voteAnecdote = (id) => {

  return async dispatch => {
    const anecdoteToVote = await anecdoteService.get(id)
    const anecdoteObj = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1
    }
    const anecdoteChange = await anecdoteService.updateAnecdote(anecdoteObj.id, anecdoteObj)
    dispatch({
      type: 'VOTE',
      data: anecdoteChange
    })
  }
  /*return {
    type: 'VOTE',
    data : { id }
  }*/
}

export const initialAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIAL_DATA',
      data: anecdotes
    })
  }
  /*return {
    type: 'INITIAL_DATA',
    data : anecdotes
  }*/
}

export default reducer