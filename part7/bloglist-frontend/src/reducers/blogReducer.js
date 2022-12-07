import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'


const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'LIKE': {
    const id = action.data.id
    return state.map(blog => blog.id !== id ? blog : action.data)
  }
  case 'REMOVE_BLOG': {
    const removeBlog = action.data.blog
    return state.filter(blog => blog.id !== removeBlog.id)
  }
  case 'COMMENT': {
    const idBlog = action.data.blog
    return state.map(blog => blog.id !== idBlog ? blog : { ...blog, comments: [...blog.comments, action.data] })
  }
  case 'INIT_BLOGS':
    return action.data
  default:
    return state
  }
}

export const createBlog = (blogObj) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blogObj)
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog,
      })
      dispatch(setNotification({ type: 'success', message: `se ha creado el blog ${newBlog.title} by ${newBlog.author}` }))
    } catch (error) {
      dispatch(setNotification({ type: 'error', message: `No se pudo crear el blog ${blogObj.title} by ${blogObj.author}` }))
    }

  }
}

export const likeBlog = (blogObj) => {
  return async dispatch => {
    try {
      const blogLiked = await blogService.update(blogObj.id, blogObj)
      dispatch({
        type: 'LIKE',
        data: blogLiked
      })
      dispatch(setNotification({ type: 'success', message: `${blogLiked.title} ha recibido un like` }))
    } catch (error) {
      dispatch(setNotification({ type: 'success', message: error.response.data.error }))
    }

  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    try {
      await blogService.remove(blog.id)
      dispatch({
        type: 'REMOVE_BLOG',
        data: { blog }
      })
      dispatch(setNotification({ type: 'success', message: `${blog.title} se ha removido exitosamente` }))
    } catch (error) {
      dispatch(setNotification({ type:'error', message:`No se pudo eliminar ${blog.title}` }))
    }

  }
}

export const createComment = (idBlog, commentObj) => {
  return async dispatch => {
    try {
      const savedComment = await blogService.createComment(idBlog, commentObj)
      dispatch({
        type: 'COMMENT',
        data: savedComment
      })
      dispatch(setNotification({ type: 'success', message: 'comentario realizado exitosamente' }))
    } catch (error) {
      dispatch(setNotification({ type: 'error', message: 'No se puedo realizar el comentario' }))
    }
  }
}

export default blogReducer