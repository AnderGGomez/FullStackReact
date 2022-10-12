const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
    .then(result=>{
        console.log('connect to MongoDB');
    })
    .catch(error=>{
        console.log('error connecting to MongoDB:', error.message);
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON',{
    transform: (document,returnedOnbject)=>{
        returnedOnbject.id = returnedOnbject._id.toString()
        delete returnedOnbject._id
        delete returnedOnbject.__v
    }
})


module.exports = mongoose.model('Person', personSchema)