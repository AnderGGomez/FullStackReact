let timeoutID = null

const initialState = {
  clear: true,
  data: { type: 'error', message: '' }
}
const notificationReducer = (state=initialState, action) => {
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
      data: {
        clear: false,
        data : { ...notification }
      }
    })
    timeoutID = setTimeout(() => {
      dispatch(endNotification())
    },time)
  }
}

export const endNotification = () => {
  return {
    type: 'END',
    data: initialState
  }
}

export default notificationReducer