const LoginForm = ({
  handleLogin,
  username,
  password,
  handleChangeUser,
  handleChangePass
}) => {
  return (
    <form onSubmit={handleLogin}>
    <div>
      username
      <input type="text" value={username} name="username"
        onChange={handleChangeUser}
      />
    </div>
    <div>
      password
      <input type="password" value={password} name="password"
        onChange={handleChangePass}
      />
    </div>
    <button type='submit'>login</button>
  </form>
  )
}

export default LoginForm