import React from 'react'
import { useSelector } from 'react-redux'
const Notification = () => {
  const notification = useSelector(state => state.notification)
  if(notification.clear){
    return null
  }
  return (
    <div className={notification.data.type}>
      {notification.data.message}
    </div>
  )
}

export default Notification