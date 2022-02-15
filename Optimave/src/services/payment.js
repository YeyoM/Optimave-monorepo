import axios from 'axios'
const baseUrl = '/api/payments'

const subs = async credentials => {
  const { data } = await axios.post(`${baseUrl}/`, credentials)
  return data
}

const customer = async credentials => {
  const { data } = await axios.post(`${baseUrl}/customer`, credentials)
  return data
}

export default { subs, customer }
