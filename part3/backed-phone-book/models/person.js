const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('connect to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

/**Creacion del Schema y validacion de los datos */
const personSchema = new mongoose.Schema({
  name : {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true
  }
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedOnbject) => {
    returnedOnbject.id = returnedOnbject._id.toString()
    delete returnedOnbject._id
    delete returnedOnbject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)