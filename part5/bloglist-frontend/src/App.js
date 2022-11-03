import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notifications'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newMessage, setNewMessage] = useState({message:"error", type:null})

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      setNewMessage({message:`${user.username} ha iniciado sesion`, type:"success"})
      setTimeout(()=>{
        setNewMessage({message:"", type:null})
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
      setNewMessage({message:'sesion cerrada', type:"success"})
      setTimeout(()=>{
        setNewMessage({message:"", type:null})
      }, 2000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password, })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNewMessage({message:`${user.username} ha iniciado sesion`, type:"success"})
      setTimeout(()=>{
        setNewMessage({message:"", type:null})
      }, 2000)
    } catch (exception) {
      setNewMessage({message:'Credenciales incorrectas', type:"error"})
      setTimeout(()=>{
        setNewMessage({message:"", type:null})
      }, 2000)
    }
  }

  const handleChangeTitle = (event) =>{
    setTitle(event.target.value)
  }

  const handleChangeAuthor = (event) =>{
    setAuthor(event.target.value)
  }

  const handleChangeUrl = (event) =>{
    setUrl(event.target.value)
  }

  const handleChangeUser = (event) => {
    setUsername(event.target.value)
  }

  const handleChangePass = (event) => {
    setPassword(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
    }

    try {
      const savedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(savedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setNewMessage({message:`El blog ${savedBlog.title} escrito por ${savedBlog.author} se ha creado correctamente`, type:"success"})
      setTimeout(()=>{
        setNewMessage({message:"", type:null})
      }, 5000)
    } catch (error) {
      setNewMessage({message:`No se pudo crear el blog ${newBlog.title}`, type:"error"})
      setTimeout(()=>{
        setNewMessage({message:"", type:null})
      }, 2000)
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification notification={newMessage} />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleChangeUser={handleChangeUser}
          handleChangePass={handleChangePass}
        />
      </div>
    )
  }
  return (
    <div>
      <Notification notification={newMessage}/>
      <p>
        {user.name} logged-in
        <button onClick={logout}>log out</button>
      </p>
      <BlogForm 
        addBlog={addBlog} 
        title={title} 
        author={author} 
        url={url} 
        handleChangeTitle={handleChangeTitle} 
        handleChangeAuthor={handleChangeAuthor} 
        handleChangeUrl={handleChangeUrl} 
      />
      <h2>blogs</h2>
      <Blog blogs={blogs}/>
    </div>
  )
}

export default App
