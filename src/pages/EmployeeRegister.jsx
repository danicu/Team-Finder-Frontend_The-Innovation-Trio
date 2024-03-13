import React from "react"

const EmployeeSingUp = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[1366px] h-[768px] bg-white shadow-xl flex rounded-xl">
        {/* Partea stanga */}
        <div className="flex-1 flex justify-center items-center rounded-xl">
          <div className="w-[50%] p-8">
            <h2 className="text-3xl font-bold mb-4">REGISTER</h2>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Name"
                className="w-[364px] h-12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="E-mail Address"
                className="w-[364px] h-12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                className="w-[364px] h-12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Repeat Password"
                className="w-[364px] h-12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <button className="w-[364px] h-[52px] bg-purple-600 text-white font-bold rounded-lg focus:outline-none">
              Sign Up
            </button>
          </div>
        </div>
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

export default EmployeeSingUp
