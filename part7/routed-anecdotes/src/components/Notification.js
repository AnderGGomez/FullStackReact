import React from "react";



const Notification = ({ notification }) => {
  if(notification !== ''){
    return (
      <div>
        {notification}
      </div>
    )
  }
}

export default Notification