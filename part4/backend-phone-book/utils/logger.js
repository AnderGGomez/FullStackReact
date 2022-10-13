//Imprime mensajes de registro
const info = (...params) => {
  console.log(...params)
}

//imprime mensajes de error
const error = (...params) => {
  console.log(...params)
}

module.exports = {
  info,error
}