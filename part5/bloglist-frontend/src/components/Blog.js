
const Display = ({blog}) => {
  return (
    <li>
      {blog.title} {blog.author}
    </li>
  )
}

const Blog = ({blogs}) => {
  return (
      <ul>
        {blogs.map(blog => <Display key={blog.id} blog={blog}/>)}
      </ul>
    )
}
  


export default Blog