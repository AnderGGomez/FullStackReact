import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes))
  const user = useSelector(state => state.login)
  const navigate = useNavigate()
  return (
    <div>
      {user && (
        <button onClick={() => { navigate('/newBlog') }}>Nuevo Blog</button>
      )}
      <div>
        {blogs.map(blog =>
          <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        )}
      </div>

    </div>


  )
}



export default BlogList