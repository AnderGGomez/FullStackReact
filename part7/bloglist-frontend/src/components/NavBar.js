import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/loginReducer'
import { Button, Navigation } from './estilos'

const NavBar = () => {
  const user = useSelector(state => state.login)
  const dispatch = useDispatch()

  const padding = {
    padding : '1em'
  }
  const logout = () => {
    dispatch(logoutUser())
  }
  return (
    <Navigation>
      {user ? (
        <div>
          <Link style={padding} to='/'>Blogs</Link>
          <Link style={padding} to='/users'>Users</Link>
          <span style={padding}>{user.name} Logged in</span> <Button $mode='primary' onClick={logout}>logout</Button>
        </div>
      ) : (
        <div>
          <Link style={padding} to='/login'>Login</Link>
        </div>

      )}
    </Navigation>
  )
}


export default NavBar