import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import CommentForm from './Forms/CommentForm'



const Comments = ({ blog }) => {
  return (
    <div>
      <h2>Comments</h2>
      <CommentForm idBlog={blog.id}/>
      <ul>
        {blog.comments.map(comment => (
          <li key={comment.id}>
            {comment.content}
          </li>
        ))}
      </ul>
    </div>
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
    dispatch(removeBlog(blog.id))
    navigate('/')
  }
  console.log(blog)
  return (
    <div>
      {blog && (
        <div>
          <h2>{blog.title}</h2>
          <div>
            <a target="_blank" href={blog.url} rel="noreferrer">{blog.url}</a>
          </div>
          <div>
            {blog.likes} likes <button onClick={changeLike}>Like</button>
          </div>
          <div>
            Creado por {blog.author}
          </div>
          <Comments blog={blog}/>
          {session.username === blog.user.username && (
            <div>
              <button onClick={deleteBlog}>remove</button>
            </div>
          )}
        </div>
      ) }
    </div>
  )
}

export default Blog