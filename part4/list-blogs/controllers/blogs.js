const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization =  request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    return authorization.substring(7)
  }
  return nullx
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username:1,name:1})
  response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const {title,author,url, likes} = new Blog(request.body)
  const token = getTokenFrom(request)

  const decodeToken = jwt.verify(token, process.env.SECRET)

  if(!token ||  !decodeToken){
    response.status(401).json({error: 'token missing or invalid'})
  }
  console.log(decodeToken)
  const user = await User.findById(decodeToken.id)

  const blog = new Blog({
    title : title,
    author: author,
    url: url,
    likes : likes,
    user: user.id
  })

  savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
  const idBlog = request.params.id;
  saveBlog = await Blog.findById(idBlog)
  if( saveBlog ){
    response.status(200).json(saveBlog)
  }else{
    response.status(400).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const idBlog = request.params.id;
  const result = await Blog.findByIdAndRemove(idBlog)
  if (result) {
    response.status(204).end()
  }else{
    response.status(404).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const filter = {_id: request.params.id}
  const updatedBlog = request.body

  const saveBlog = await Blog.findByIdAndUpdate(filter,updatedBlog)

  if(saveBlog){
    return response.status(200).json(saveBlog)
  }else{
    return response.status(400).end()
  }
})


module.exports = blogsRouter