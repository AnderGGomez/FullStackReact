const BlogForm = ({
  addBlog,
  title,
  author,
  url, 
  handleChangeTitle, 
  handleChangeAuthor, 
  handleChangeUrl
}) => {
  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input type="text" value={title} name="Title"
          onChange={handleChangeTitle} />
      </div>
      <div>
        author:
        <input type="text" value={author} name="Author"
          onChange={handleChangeAuthor} />
      </div>
      <div>
        URL:
        <input type="text" value={url} name="URL"
          onChange={handleChangeUrl} />
      </div>

      <button type='submit'>Crear Blog</button>
    </form>
  )
}

export default BlogForm