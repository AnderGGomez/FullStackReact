import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { BlogContainer, ContentContainer, Title } from './estilos'

const User = () => {
  const id = useParams().id
  const user = useSelector(state => state.users.find(user => user.id === id))
  if (!user) {
    return null
  }
  return (
    <BlogContainer>
      <Title>{user.name}</Title>
      <ContentContainer>
        <ul>
          {user.blogs.map(blog =>
            <li key={blog.id} >
              <Link to={`../blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          )}
        </ul>
      </ContentContainer>

    </BlogContainer>
  )
}


export default User