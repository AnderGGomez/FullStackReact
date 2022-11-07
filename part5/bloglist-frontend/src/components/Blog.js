import { useState } from "react"

const Display = ({visible, blog, changeVisibility}) => {
  const label = visible ? 'hide' : 'show'
  return (
    <div>
      <p>Title:{blog.title} - Author: {blog.author} <button onClick={changeVisibility}>{label}</button></p>
      {visible ? <div>
        <p>URL:{blog.url}</p>
        <p>Likes:{blog.likes}</p>
      </div> : null}
    </div>
      
  )
}

const Blog = ({blog}) => {
  const [visible, setVisible]=useState(false)
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const changeVisibility = () => {
    setVisible(!visible)
  }
  return (
    <div style={blogStyle}>
        <Display visible={visible} blog={blog} changeVisibility={changeVisibility}/>
    </div>
      
    )
}
  


export default Blog