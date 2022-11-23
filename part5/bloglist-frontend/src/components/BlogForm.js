import React, { useState } from 'react'
const BlogForm = ({
  handleAddBlog,
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = () => {
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }
    handleAddBlog(newBlog)
  }
  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input id='title' type="text" value={title} name="Title"
          onChange={({ target }) => {setTitle(target.value)}} />
      </div>
      <div>
        author:
        <input id='author' type="text" value={author} name="Author"
          onChange={({ target }) => {setAuthor(target.value)}} />
      </div>
      <div>
        URL:
        <input id='url' type="text" value={url} name="URL"
          onChange={({ target }) => {setUrl(target.value)}} />
      </div>

      <button id="create" type='submit'>Crear Blog</button>
    </form>
  )
}

export default BlogForm