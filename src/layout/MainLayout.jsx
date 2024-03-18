import React, { useEffect, useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBell,
  faHouse,
  faNewspaper,
  faUsers,
} from "@fortawesome/free-solid-svg-icons"
import api from "../api"

const navItems = [
  {
    to: "/mypage",
    name: "MyPage",
  },
  {
    to: "/departments",
    name: "Departments",
    Icon: <FontAwesomeIcon icon={faHouse} />,
  },
  {
    to: "/projects",
    name: "Projects",
    Icon: <FontAwesomeIcon icon={faNewspaper} />,
  },
  {
    to: "/administration",
    name: "Administration",
    Icon: <FontAwesomeIcon icon={faUsers} />,
  },
]

const Layout = () => {
  const { pathname } = useLocation()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("users/connected-user")
        setUser(response.data)
      } catch (error) {
        // Handle error or redirect to login
      }
    }

    fetchProfile()
  }, [])

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="bg-indigo-800 px-4 py-2 flex justify-between items-center">
        {/* Notificari și Căutare */}
        <div className="flex items-center ml-auto">
          {/* Căutare */}
          <div className="flex items-center mr-4">
            <input
              type="text"
              placeholder="Cautare"
              className="bg-white text-black border border-gray-600 px-3 py-1 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <button className="bg-transparent border-none p-1 rounded-full mr-4 focus:outline-none">
            <FontAwesomeIcon
              icon={faBell}
              className="text-white transform rotate-45"
            />
          </button>
        </div>
        {/* Nume Admin și imagine */}
        <div className="flex items-center">
          <img src="/" alt="Admin" className="w-8 h-8 rounded-full mr-2" />
          <p className="text-white">{user && user.userName}</p>
        </div>
      </nav>

      {/* Sidebar și conținut */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="bg-indigo-700 w-60 flex flex-col">
          <div className="p-4">
            <h2 className="text-white text-lg font-semibold mb-4">Menu</h2>
            <ul>
              {navItems.map((item) => (
                <li key={item.to} className="mb-2">
                  <Link key={item.to} to={item.to}>
                    <button
                      className={`flex items-center justify-center text-black w-full h-10 rounded-lg ${
                        pathname === item.to
                          ? "bg-purple-300 text-black font-bold"
                          : ""
                      }`}
                    >
                      {item.Icon && <span className="mr-2">{item.Icon}</span>}
                      <span>{item.name}</span>
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="right-section">
            <section>
              <div className="content">
                <Outlet />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
