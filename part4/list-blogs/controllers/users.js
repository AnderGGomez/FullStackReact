const bcryptjs = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {title:1,likes:1})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const {name, username, password} = request.body
  if (password.length < 3){
    return response.status(400).json({error: 'La passaword debe tener al menos 3 caracteres'})
  }
  const userExist = await User.findOne({ username })

  if (userExist){
    return response.status(400).json({error:'El `username` ya existe'})
  }

  const saltRounds = 10
  const passwordHash = await bcryptjs.hash(password, saltRounds)

  const userObj = new User({
      username: username,
      name: name,
      passwordHash: passwordHash
    })

  const saveUser = await userObj.save()
  response.status(201).json(saveUser)
})

module.exports = usersRouter