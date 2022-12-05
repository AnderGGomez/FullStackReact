import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

const User = () => {
  const id = useParams().id
  const user = useSelector(state => state.users.find(user => user.id === id))
  if (!user){
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id} >
            <Link to={`../blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}


export default User