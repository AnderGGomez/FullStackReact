/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import Notification from './components/Notifications'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initUser } from './reducers/loginReducer'
import { initializeUser } from './reducers/usersReducer'
import Rutas from './components/Rutas'
import NavBar from './components/NavBar'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initUser())
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])


  const user = useSelector(state => state.login)
  console.log(user)
  return (
    <div>
      <NavBar />
      <Notification />
      <h2>Blog App</h2>
      <Rutas />
    </div>
  )
}

export default App
