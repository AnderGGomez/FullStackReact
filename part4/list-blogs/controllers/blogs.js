const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = new Blog(request.body)

  const decodeToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodeToken) {
    response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodeToken.id)

  const blogObj = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: user.id
  })

  const savedBlog = await blogObj.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
  const idBlog = request.params.id;
  saveBlog = await Blog.findById(idBlog)
  if (saveBlog) {
    response.status(200).json(saveBlog)
  } else {
    response.status(400).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const idBlog = request.params.id;
  const decodeToken = jwt.verify(request.token, process.env.SECRET)

  const blog = await Blog.findById(idBlog)

  if (blog) {
    if (decodeToken.id.toString() === blog.user.toString()) {
      await Blog.findByIdAndRemove(blog.id)
      response.status(204).end()
    } else {
      response.status(401).json({ error: `El usuario ${decodeToken.username} no esta autorizado para eliminar este blog` })
    }
  }else{
    response.status(404).json({error: `Recurso no encontrado`})
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const filter = { _id: request.params.id }
  const updatedBlog = request.body
  const saveBlog = await Blog.findByIdAndUpdate(filter, updatedBlog, {new:true})
  if (saveBlog) {
    response.status(200).json(saveBlog)
  } else {
    response.status(404).json({error:'Recurso no encontrado'})
  }
})


module.exports = blogsRouter