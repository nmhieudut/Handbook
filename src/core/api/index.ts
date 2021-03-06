import axios from 'axios'
import { LSManager } from 'utils/localstoragemanager'

const axiosClient = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api/v1`,
  // timeout: 2000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: '',
  },
})

// Add a request interceptor
axiosClient.interceptors.request.use(
  (config: any) => {
    const token = LSManager.getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // Must return config
    return config
  },
  (error: Error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data
    }
    return response
  },
  (error: Error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

export default axiosClient
