import React, { useState } from 'react'

const Display = ({ visible, blog, changeVisibility, changeLike, deleteBlog, user }) => {
  const label = visible ? 'hide' : 'show'
  const remove = { display: user.name !== blog.user.name ? 'none' : '' }
  return (
    <div className='basic'>
      <p>{blog.title}-{blog.author}<button id='visibility' onClick={changeVisibility}>{label}</button></p>
      {visible ? <div className='extra'>
        <p>URL:{blog.url}</p>
        <p>Likes:{blog.likes}<button id='touch-like' onClick={changeLike}>Like</button></p>
        <div id='button-remove' style={remove}>
          <button id="remove-blog" onClick={deleteBlog}>remove</button>
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
    <div className='blog' style={blogStyle}>
      <Display visible={visible} blog={blog} changeVisibility={changeVisibility} changeLike={changeLike} deleteBlog={deleteBlog} user={user} />
    </div>

  )
}



export default Blog