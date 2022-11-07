import { useState } from "react"
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
        <input type="text" value={title} name="Title"
          onChange={({target})=>{setTitle(target.value)}} />
      </div>
      <div>
        author:
        <input type="text" value={author} name="Author"
          onChange={({target})=>{setAuthor(target.value)}} />
      </div>
      <div>
        URL:
        <input type="text" value={url} name="URL"
          onChange={({target})=>{setUrl(target.value)}} />
      </div>

      <button type='submit'>Crear Blog</button>
    </form>
  )
}

export default BlogForm