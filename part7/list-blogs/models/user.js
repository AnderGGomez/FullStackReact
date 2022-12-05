const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

//Esquema de usuarios.
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    minlength: [3, 'Los nombres de usuario deben tener al menos de 3 caracteres'],
    unique : true
  },
  name: {
    type:String,
    require: true
  },
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})

userSchema.plugin(uniqueValidator)
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the password should not be revealed
    delete returnedObject.passwordHash
  }
})


module.exports = mongoose.model('User', userSchema)