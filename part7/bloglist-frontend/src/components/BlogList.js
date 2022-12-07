import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button, ContentContainer, Grid, ItemContainer } from './estilos'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes))
  const user = useSelector(state => state.login)
  const navigate = useNavigate()
  return (
    <div>
      {user && (
        <Button  onClick={() => { navigate('/newBlog') }}>Nuevo Blog</Button>
      )}
      <Grid>
        {blogs.map(blog =>
          <Link key={blog.id} to={`/blogs/${blog.id}`}>
            <ItemContainer>
              <ContentContainer $mode='primary'>
                {blog.title}
              </ContentContainer>
            </ItemContainer>
          </Link>
        )}
      </Grid>
    </div>


  )
}



export default BlogList