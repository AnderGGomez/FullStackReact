import React from 'react'
import useField from '../../hooks/useField'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../reducers/loginReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const { clear: clearUsername,...username } = useField('text')
  const { clear: clearPassword,...password } = useField('text')

  const clear = () => {
    clearPassword()
    clearUsername()
  }
  const login = (event) => {
    event.preventDefault()
    const credentials = {
      username: username.value,
      password: password.value
    }
    dispatch(loginUser(credentials))
    clear()
  }
  return (
    <form onSubmit={login}>
      <div>
        username
        <input {...username} />
      </div>
      <div>
        password
        <input {...password}/>
      </div>
      <button id="login-form" type='submit'>login</button>
    </form>
  )
}

export default LoginForm