import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notifications'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [newMessage, setNewMessage] = useState({ message: 'error', type: null })
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      setNewMessage({ message: `${user.username} ha iniciado sesion`, type: 'success' })
      setTimeout(() => {
        setNewMessage({ message: '', type: null })
      }, 2000)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const logout = () => {
    if (user) {
      window.localStorage.removeItem('loggedBlogAppUser')
      setUser(null)
      setNewMessage({ message: 'sesion cerrada', type: 'success' })
      setTimeout(() => {
        setNewMessage({ message: '', type: null })
      }, 2000)
    }
  }

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setNewMessage({ message: `${user.username} ha iniciado sesion`, type: 'success' })
      setTimeout(() => {
        setNewMessage({ message: '', type: null })
      }, 2000)
    } catch (error) {
      console.log(error)
      setNewMessage({ message: 'Credenciales incorrectas', type: 'error' })
      setTimeout(() => {
        setNewMessage({ message: '', type: null })
      }, 2000)
    }
  }

  const handleAddBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const savedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(savedBlog))
      setNewMessage({ message: `El blog ${savedBlog.title} escrito por ${savedBlog.author} se ha creado correctamente`, type: 'success' })
      setTimeout(() => {
        setNewMessage({ message: '', type: null })
      }, 5000)
    } catch (error) {
      setNewMessage({ message: `No se pudo crear el blog ${newBlog.title}`, type: 'error' })
      setTimeout(() => {
        setNewMessage({ message: '', type: null })
      }, 2000)
    }
  }

  const handleUpdateBlog = async (editBlog) => {
    try {
      const blogUpdate = await blogService.update(editBlog.id, editBlog)
      setBlogs(blogs.map(blog => blog.id !== editBlog.id ? blog : { ...blog, likes: blogUpdate.likes }))
      setNewMessage({ message: `${blogUpdate.title} ha recibido un like`, type: 'success' })
      setTimeout(() => {
        setNewMessage({ message: '', type: null })
      }, 2000)
    } catch (error) {
      setNewMessage({ message: 'error al actualizar', type: 'error' })
      setTimeout(() => {
        setNewMessage({ message: '', type: null })
      }, 2000)
    }
  }

  const handleRemoveBlog = async (deleteBlog) => {
    if (window.confirm(`seguro que quieres eliminar el blog : ${deleteBlog.title}`)) {
      try {
        await blogService.remove(deleteBlog.id)
        setBlogs(blogs.filter(blog => blog.id !== deleteBlog.id))
        setNewMessage({ message: `${deleteBlog.title} fue eliminado con exito`, type: 'success' })
        setTimeout(() => {
          setNewMessage({ message: '', type: null })
        }, 2000)
      } catch (error) {
        setNewMessage({ message: 'error al eliminar', type: 'error' })
        setTimeout(() => {
          setNewMessage({ message: '', type: null })
        }, 2000)
      }
    }

  }

  if (user === null) {
    return (
      <div>
        <Notification notification={newMessage} />
        <Togglable buttonLabel='login'>
          <LoginForm
            handleLogin={handleLogin}
          />
        </Togglable>
      </div>
    )
  }
  return (
    <div>
      <Notification notification={newMessage} />
      <p>
        {user.name} logged-in
        <button id="log-out" onClick={logout}>log out</button>
      </p>
      <Togglable buttonLabel='new Blog' ref={blogFormRef}>
        <BlogForm
          handleAddBlog={handleAddBlog}
        />
      </Togglable>

      <h2>blogs</h2>
      <div className='blogs'>
        {
          blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <Blog key={blog.id}
                blog={blog}
                user={user}
                handleUpdateBlog={handleUpdateBlog}
                handleRemoveBlog={handleRemoveBlog}
              />)}
      </div>
    </div>
  )
}

export default App
