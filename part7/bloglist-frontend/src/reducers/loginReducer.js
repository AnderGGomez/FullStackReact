import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const loginReducer = (state=null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.data
  case 'RECOVER':
    return action.data
  case 'LOGOUT':
    return action.data
  default:
    return state
  }
}

export const loginUser = (credentials) => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type:'LOGIN',
        data:user
      })
      dispatch(setNotification({ type: 'success', message: `${user.username} ha iniciado sesion` }))
    } catch (error) {
      console.log(error)
      dispatch(setNotification({ type: 'error', message: error.response.data.error }))
    }
  }
}

export const logoutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch({
      type:'LOGOUT',
      data: null
    })
  }
}

export const initUser = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type:'RECOVER',
        data: user
      })
      dispatch(setNotification({ type: 'success', message: `${user.username} ha iniciado sesion` }))
    }
  }
}
export default loginReducer