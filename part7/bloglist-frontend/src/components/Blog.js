import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { BlogContainer, Button, CommentContainer, ContentContainer, ExternalLink, Title } from './estilos'
import CommentForm from './Forms/CommentForm'



const Comments = ({ blog }) => {
  return (
    <CommentContainer>
      <h2>Comments</h2>
      <CommentForm idBlog={blog.id}/>
      <ul>
        {blog.comments.map(comment => (
          <li key={comment.id}>
            {comment.content}
          </li>
        ))}
      </ul>
    </CommentContainer>
  )
}

const Blog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const id = useParams().id
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))
  const session = useSelector(state => state.login)

  const changeLike = () => {
    const blogObj = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
      comments: blog.comments.map(comment => comment.id)
    }
    dispatch(likeBlog(blogObj))
  }

  const deleteBlog = () => {
    dispatch(removeBlog(blog))
    navigate('/')
  }
  return (
    <div>
      {blog && (
        <BlogContainer>
          <Title>{blog.title}</Title>
          <ContentContainer>
            <div>
              <ExternalLink target="_blank" href={blog.url} rel="noreferrer">{blog.url}</ExternalLink>
            </div>
            <div>
              {blog.likes} likes <Button $mode='primary' onClick={changeLike}>Like</Button>
            </div>
            <div>
              Creado por {blog.author}
            </div>
          </ContentContainer>
          <Comments blog={blog}/>
          {session.username === blog.user.username && (
            <div>
              <Button onClick={deleteBlog}>remove</Button>
            </div>
          )}
        </BlogContainer>
      ) }
    </div>
  )
}

export default Blog