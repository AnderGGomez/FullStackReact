let timeoutID;
const reducer = (state = '',action) => {
  switch(action.type){
    case 'SET':
      return action.data.message
    case 'END_NOTIFICATION':
      return action.data.message
    default:
      return state
  }
}

export const setNotification = (message, time=5000) => {
  return async dispatch => {
    clearTimeout(timeoutID)
    dispatch({
      type:'SET',
      data:{message}
    })
    timeoutID =setTimeout(() => {
      dispatch(notificationEnd())
    }, time)
  }
  /*return {
    type: 'SET',
    data: {
      message
    }
  }*/
}

export const notificationEnd = () => {
  return {
    type: 'END_NOTIFICATION',
    data: {
      message: ''
    }
  }
}



export default reducer