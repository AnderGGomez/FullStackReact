import React,{ useState } from 'react'
import PropType from 'prop-types'
const LoginForm = ({
  handleLogin,
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = (event) => {
    event.preventDefault()
    handleLogin({
      username: username, password: password
    })
    setUsername('')
    setPassword('')
  }
  return (
    <form onSubmit={login}>
      <div>
        username
        <input id="username" type="text" value={username} name="username"
          onChange={({ target }) => { setUsername(target.value) }}
        />
      </div>
      <div>
        password
        <input id="password" type="password" value={password} name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-form" type='submit'>login</button>
    </form>
  )
}
LoginForm.displayName = 'LoginForm'
LoginForm.prototype = {
  handleLogin: PropType.func.isRequired
}
export default LoginForm