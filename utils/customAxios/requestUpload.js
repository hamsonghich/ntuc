import axios from 'axios'

const requestUpload = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data;',
  }
})

// after send requestUpload
requestUpload.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default requestUpload;
