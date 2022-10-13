const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

//Conexion a la base de datos
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.log('Error connecting to MongoDB',error.message);
  })

//Construir el esquema del blog
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
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