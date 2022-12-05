import blogService from '../services/blogs'


const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'LIKE': {
    const id = action.data.id
    return state.map(blog => blog.id !== id ? blog : action.data)
  }
  case 'REMOVE_BLOG':{
    const id = action.data.id
    return state.filter(blog => blog.id !== id)
  }
  case 'COMMENT':{
    const idBlog = action.data.blog
    return state.map(blog => blog.id !== idBlog ? blog : { ...blog, comments:[...blog.comments,action.data] })
  }
  case 'INIT_BLOGS':
    return action.data
  default:
    return state
  }
}

export const createBlog = (blogObj) => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObj)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const likeBlog = (blogObj) => {
  return async dispatch => {
    const blogLiked = await blogService.update(blogObj.id,blogObj)
    dispatch({
      type: 'LIKE',
      data: blogLiked
    })
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

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: { id }
    })
  }
}

export const createComment = (idBlog,commentObj) => {
  return async dispatch => {
    const savedComment = await blogService.createComment(idBlog,commentObj)
    dispatch({
      type:'COMMENT',
      data : savedComment
    })
  }
}

export default blogReducer