import React, { useState } from 'react'

const Display = ({ visible, blog, changeVisibility, changeLike, deleteBlog, user }) => {
  const label = visible ? 'hide' : 'show'
  const remove = { display: user.name !== blog.user.name ? 'none' : '' }
  return (
    <div>
      <p>Title:{blog.title}<button onClick={changeVisibility}>{label}</button></p>
      {visible ? <div>
        <p>URL:{blog.url}</p>
        <p>Likes:{blog.likes} <button onClick={changeLike}>Like</button></p>
        <p>Author: {blog.author} </p>
        <div style={remove}>
          <button onClick={deleteBlog}>remove</button>
        </div>
      </div> : null}
    </div>

  )
}

const Blog = ({ blog, user, handleUpdateBlog, handleRemoveBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const changeVisibility = () => {
    setVisible(!visible)
  }

  const changeLike = () => {
    const newBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    handleUpdateBlog(newBlog)
  }

  const deleteBlog = () => {
    handleRemoveBlog(blog)
  }
  return (
    <div style={blogStyle}>
      <Display visible={visible} blog={blog} changeVisibility={changeVisibility} changeLike={changeLike} deleteBlog={deleteBlog} user={user} />
    </div>

  )
}



export default Blog