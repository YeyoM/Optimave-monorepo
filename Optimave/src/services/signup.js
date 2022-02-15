import axios from 'axios'
const baseUrl = '/api/users'

const signup = async credentials => {
  const { data } = await axios.post(baseUrl, credentials)
  return data
}

export default { signup }
