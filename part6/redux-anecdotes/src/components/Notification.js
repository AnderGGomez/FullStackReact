import { useSelector } from "react-redux"


const Display = ({message}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {message}
    </div>
  )
}
const Notification = () => {
  const notificacion = useSelector(state => state.notification)
  let message = ''
  switch (notificacion.type) {
    case 'voted':
      message = `has votado por: ${notificacion.message}`
      return(
        <Display message={message}/>
      )
    case 'create':
      message = `has creado a: ${notificacion.message}`
      return(
        <Display message={message}/>
      )
    default:
      break;
  }
  if (notificacion.type === 'voted') {
    
  }
  return (
    <div>

    </div>
  )
}

export default Notification