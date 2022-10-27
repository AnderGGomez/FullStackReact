const mongoose = require('mongoose')


//Construir el esquema del blog
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number, 
    default:0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

//Definir la manera en la que se mostraran los datos al usuario.
blogSchema.set('toJSON',{
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


//Crear y exportar el modelo del Blog
module.exports = mongoose.model('Blog',blogSchema)