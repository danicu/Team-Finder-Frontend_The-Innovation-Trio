import React from "react"
import api from "../api"

const SignUpPage = () => {
  const handleSignUp = (e) => {
    e.preventDefault()
    console.log(e)

    const form = e.target
    const name = form["name"].value
    const email = form["email"].value
    const password = form["password"].value
    const repeatpassword = form["password-repeat"].value
    const organizationName = form["organizationName"].value
    const headquarterAddress = form["headquarterAddress"].value

    try {
      api.post("/register", {
        name,
        email,
        password,
        organizationName,
        headquarterAddress,
      })
      alert("Contul a fost creat cu succes!")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[1366px] h-[768px] bg-white shadow-xl flex rounded-xl">
        {/* Partea stanga */}

        <form
          onSubmit={handleSignUp}
          className="flex-1 flex justify-center items-center rounded-xl"
        >
          <div className="w-[50%] p-8">
            <h2 className="text-3xl font-bold mb-4">REGISTER</h2>
            <div className="mb-4">
              <input
                name="name"
                type="text"
                placeholder="Name"
                className="w-[364px] h-12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                name="email"
                type="email"
                placeholder="E-mail Address"
                className="w-[364px] h-12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="w-[364px] h-12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                name="password-repeat"
                type="password"
                placeholder="Repeat Password"
                className="w-[364px] h-12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                name="organizationName"
                type="text"
                placeholder="Organization Name"
                className="w-[364px] h-12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-8">
              <input
                name="headquarterAddress"
                type="text"
                placeholder="Headquarter Address"
                className="w-[364px] h-12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-[364px] h-[52px] bg-purple-600 text-white font-bold rounded-lg focus:outline-none"
            >
              Sign Up
            </button>
          </div>
        </form>
        {/* Partea dreapta */}
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
      </div>
    </div>
  )
}

export default SignUpPage
