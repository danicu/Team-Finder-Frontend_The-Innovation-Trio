import axios from "axios"

const api = axios.create({
  baseURL:
    "https://atc-2024-the-innovation-trio-be-linux-web-app.azurewebsites.net",
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem("refreshToken")
        const response = await api.post("/users/connected-user", {
          refreshToken,
        })
        const { token } = response.data

        localStorage.setItem("token", token)

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${token}`
        return api(originalRequest)
      } catch (error) {
        // Handle refresh token error or redirect to login
      }
    }

    return Promise.reject(error)
  }
)
export default api
