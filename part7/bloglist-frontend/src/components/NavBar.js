import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/loginReducer'

const NavBar = () => {
  const user = useSelector(state => state.login)
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(logoutUser())
  }
  return (
    <div>
      {user ? (
        <div>
          <Link to='/'>Blogs</Link>
          <Link to='/users'>Users</Link>
          {user.name} esta logeado <button onClick={logout}>logout</button>
        </div>
      ) : (
        <div>
          <Link to='/login>'>Login</Link>
        </div>

      )}
    </div>
  )
}


export default NavBar