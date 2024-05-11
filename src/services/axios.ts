import axios from 'axios'

const { VITE_BASE_URL, VITE_NOT_A_SECRET_TOKEN, VITE_STORE_ID } = import.meta.env

const token = `Bearer ${VITE_NOT_A_SECRET_TOKEN}`
const baseUrl = `${VITE_BASE_URL}/${VITE_STORE_ID}`

axios.interceptors.request.use((config) => {
  config.headers.Authorization = token
  config.url = `${baseUrl}${config.url}`
  return config
})

const refreshToken = async () => {
    try {
      const response = await axios.post('/refresh')
      return response.data.content.api_key
    } catch (error) {
      localStorage.clear()
      return Promise.reject(error)
    }
}

axios.interceptors.response.use(
    response => {
      return response
    },
    async error => {
      const originalRequest = error.config
      if (error.response.status === 400 && !originalRequest._retry) {
        originalRequest._retry = true
        try {
          axios.defaults.headers.Authorization = await refreshToken()
          return axios(originalRequest)
        } catch (refreshError) {
          return Promise.reject(refreshError)
        }
      }
      return Promise.reject(error)
    }
)

export default axios
