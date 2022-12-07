import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useField from '../../hooks/useField'
import { createBlog } from '../../reducers/blogReducer'

const BlogForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { clear: clearTitle, ...title } = useField('text')
  const { clear: clearAuthor, ...author } = useField('text')
  const { clear: clearUrl, ...url } = useField('text')

  const clear = () => {
    clearTitle()
    clearAuthor()
    clearUrl()
  }
  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }
    dispatch(createBlog(newBlog))
    clear()
    navigate('/')
  }
  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input {...title} />
      </div>
      <div>
        author:
        <input {...author} />
      </div>
      <div>
        URL:
        <input {...url} />
      </div>
      <button id="create" type='submit'>Crear Blog</button>
    </form>
  )
}

export default BlogForm