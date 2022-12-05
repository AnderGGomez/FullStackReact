import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import User from './User'
import Blog from './Blog'
import BlogForm from './Forms/BlogForm'
import UserList from './UserList'
import BlogList from './BlogList'
import { useSelector } from 'react-redux'
import LoginForm from './Forms/LoginForm'

const Rutas = () => {
  const user = useSelector(state => state.login)

  return (
    <div>
      <Routes>
        <Route path='/users/:id' element={user ? <User /> : <Navigate to='/login'/>} />
        <Route path='/blogs/:id' element={user ? <Blog /> : <Navigate to='/login'/>} />
        <Route path='/newBlog' element={user ? <BlogForm /> : <Navigate to='/login'/>} />
        <Route path='/login' element={user ? <Navigate to='/'/> : <LoginForm /> } />
        <Route path='/users' element={user ? <UserList /> : <Navigate to='/login'/>} />
        <Route path='/' element={user ? <BlogList /> : <Navigate to='/login' /> } />
      </Routes>
    </div>
  )
}

export default Rutas
