let timeoutID = null

const notificationReducer = (state=null, action) => {
  switch (action.type) {
  case 'SET':
    return action.data
  case 'END':
    return action.data
  default:
    return state
  }
}

export const setNotification = (notification, time=5000) => {
  return async dispatch => {
    clearTimeout(timeoutID)
    dispatch({
      type:'SET',
      data:notification
    })
    timeoutID = setTimeout(() => {
      dispatch(endNotification())
    },time)
  }
}

export const endNotification = () => {
  return {
    type: 'END',
    data: null
  }
}

export default notificationReducer