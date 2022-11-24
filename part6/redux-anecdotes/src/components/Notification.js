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
  if(notificacion !== '') {
    return (
      <Display message={notificacion} />
    )
  }
}

export default Notification