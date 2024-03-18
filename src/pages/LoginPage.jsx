import React, { useState } from "react"
import api from "../api"
import { useNavigate, Link } from "react-router-dom"

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post("/auth/authenticate", credentials)
      const { token, refreshToken } = response.data

      localStorage.setItem("token", token)
      localStorage.setItem("refreshToken", refreshToken)
      alert("Te-ai logat cu succes!")

      // Navigare către "MyPage" după autentificare
      navigate("/mypage")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[1366px] h-[768px] bg-white shadow-xl flex rounded-xl">
        {/* Partea stanga */}
        <div
          className="flex-1 bg-[#9181F4] bg-cover bg-right flex items-center justify-center rounded-xl"
          style={{
            backgroundImage: 'url("/path/to/image.png")',
          }}
        >
          <div className="text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Team Finder App</h2>
          </div>
        </div>
        {/* Partea dreapta */}
        <div className="flex-1 flex justify-center items-center rounded-xl">
          <div className="w-[50%] p-8">
            <h2 className="text-3xl font-bold mb-4">LOGIN</h2>
            <div className="mb-4">
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  placeholder="E-mail Address"
                  className=" mb-4 w-[364px] h-12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />

                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className=" mb-4 w-[364px] h-12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="w-[364px] h-[52px] bg-purple-600 text-white font-bold rounded-lg focus:outline-none"
                >
                  Login
                </button>
              </form>
            </div>
            <div>
              <p>
                You don't have an account?{" "}
                <Link to="/register" className="text-blue-500">
                  Sign Up here!
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
