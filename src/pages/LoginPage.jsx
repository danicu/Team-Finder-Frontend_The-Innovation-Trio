import React, { useState } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import e from "cors"
const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })
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
      navigate("/")
    } catch (error) {}
  }
  // const handleLogin = async (e) => {
  //   try {
  //     const response = await api.post("/auth/authenticate", {
  //       email: email,
  //       password: password,
  //     })
  //     console.log("Autentificare reușită!", response.data)
  //     alert("Te-ai logat cu succes!")
  //     navigate("/administration")
  //   } catch (error) {
  //     console.error("Eroare la autentificare:", error)
  //   }
  // }

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
          {/* <div className="w-[50%] p-8">
            <h2 className="text-3xl font-bold mb-4">LOGIN</h2>
            <div className="mb-4">
              <input
                type="text"
                placeholder="E-mail Address"
                className="w-[364px] h-12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                className="w-[364px] h-12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4 flex items-center">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-gray-600">
                Remember me
              </label>
            </div>
            <button
              className="w-[364px] h-[52px] bg-purple-600 text-white font-bold rounded-lg focus:outline-none"
              onClick={handleLogin}
            >
              Login Now
            </button>
          </div> */}
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
