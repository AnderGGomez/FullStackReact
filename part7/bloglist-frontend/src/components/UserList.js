import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ContentContainer, Grid, ItemContainer } from './estilos'

const UserList = () => {
  const users = useSelector(state => state.users)
  return (
    <div>
      <Grid>
        {users.map(user =>
          <Link key={user.id} to={`/users/${user.id}`}>
            <ItemContainer>
              <ContentContainer $mode='primary'>
                {user.name}
              </ContentContainer>
              <ContentContainer $mode='primary'>
                Blogs: {user.blogs.length}
              </ContentContainer>
            </ItemContainer>
          </Link>
        )}
      </Grid>
    </div>
  )
}

/**
 * <table>
        <tbody>
          <tr>
            <th>User</th>
            <th>Blogs create</th>
          </tr>
          {users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
 */
export default UserList