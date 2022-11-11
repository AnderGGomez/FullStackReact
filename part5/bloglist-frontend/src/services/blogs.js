import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken=( newToken ) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization : token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (id,blog) => {
  const response = await axios.put(`${baseUrl}/${id}`,blog)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers : { Authorization : token }
  }
  return await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, setToken, create, update, remove }