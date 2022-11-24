
const reducer = (state = '',action) => {
  switch(action.type){
    case 'VOTE_ANECDOTE':
      return action.data
    case 'END_NOTIFICATION':
      return action.data
    case 'CREATE_ANECDOTE':
      return action.data
    default:
      return state
  }
}

export const notificationVote = (message) => {
  return {
    type: 'VOTE_ANECDOTE',
    data: {
      type: 'voted',
      message: message
    }
  }
}

export const notificationEnd = () => {
  return {
    type: 'END_NOTIFICATION',
    data: {
      type: null,
      message: ''
    }
  }
}


export const notificationMake = (message) => {
  return {
    type: 'CREATE_ANECDOTE',
    data: {
      type: 'create',
      message: message
    }
  }
}


export default reducer