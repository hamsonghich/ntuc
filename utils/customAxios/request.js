import axios from 'axios'

const request = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;',
  }
})

// after send request
request.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default request;
