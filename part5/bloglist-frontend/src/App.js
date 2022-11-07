import { useState, useEffect, useRef } from 'react'
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
  const [newMessage, setNewMessage] = useState({ message: "error", type: null })
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      setNewMessage({ message: `${user.username} ha iniciado sesion`, type: "success" })
      setTimeout(() => {
        setNewMessage({ message: "", type: null })
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
      setNewMessage({ message: 'sesion cerrada', type: "success" })
      setTimeout(() => {
        setNewMessage({ message: "", type: null })
      }, 2000)
    }
  }

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setNewMessage({ message: `${user.username} ha iniciado sesion`, type: "success" })
      setTimeout(() => {
        setNewMessage({ message: "", type: null })
      }, 2000)
    } catch (error) {
      setNewMessage({ message: 'Credenciales incorrectas', type: "error" })
      setTimeout(() => {
        setNewMessage({ message: "", type: null })
      }, 2000)
    }
  }

  const handleAddBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const savedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(savedBlog))
      setNewMessage({ message: `El blog ${savedBlog.title} escrito por ${savedBlog.author} se ha creado correctamente`, type: "success" })
      setTimeout(() => {
        setNewMessage({ message: "", type: null })
      }, 5000)
    } catch (error) {
      setNewMessage({ message: `No se pudo crear el blog ${newBlog.title}`, type: "error" })
      setTimeout(() => {
        setNewMessage({ message: "", type: null })
      }, 2000)
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
        <button onClick={logout}>log out</button>
      </p>
      <Togglable buttonLabel='new Blog' ref={blogFormRef}>
        <BlogForm
          handleAddBlog={handleAddBlog}
        />
      </Togglable>

      <h2>blogs</h2>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

export default App
