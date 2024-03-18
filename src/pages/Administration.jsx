import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faPlus,
  faCopy,
  faUser,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons"
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import UserTable from "./UserTable"
import Modal from "react-modal"
import TeamRoles from "./TeamRoles"

const TableRow = ({ item, jobColors }) => (
  <tr key={item.name}>
    <td className="p-4">
      <div className="flex items-center space-x-2">
        <img
          src={item.avatar}
          alt={item.name}
          className="w-8 h-8 rounded-full"
        />
        <span className="text-sm font-semibold">{item.name}</span>
      </div>
    </td>
    <td>
      <span
        className={`inline-block px-2 py-1 text-sm font-semibold rounded-md ${
          jobColors[item.job.toLowerCase()]
        }`}
      >
        {item.job}
      </span>
    </td>
    <td>
      <button
        className="text-blue-500 hover:underline"
        onClick={() => window.open(`mailto:${item.email}`)}
      >
        {item.email}
      </button>
    </td>
    <td>
      <span className="text-sm">{item.phone}</span>
    </td>
    <td className="text-right">
      <button className="text-gray-500 hover:text-gray-700 mr-2">
        <FontAwesomeIcon icon={faPencilAlt} className="w-4 h-4" />
      </button>
      <button className="text-red-500 hover:text-red-700">
        <FontAwesomeIcon icon={faTrashAlt} className="w-4 h-4" />
      </button>
    </td>
  </tr>
)

const Administration = ({ data, jobColors }) => {
  const [url, setUrl] = useState("")
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const handleClick = () => {
    setUrl(window.location.href)
  }

  const handleCopy = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("Linkul a fost copiat în clipboard!")
      })
      .catch((error) => {
        console.error("Eroare la copierea link-ului:", error)
      })
  }

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  return (
    <div className="flex">
      <div className="w-full max-w-[650px] border-r border-r-black">
        <button
          className="mb-4 bg-transparent text-green-500 font-semibold py-2 px-4 rounded-lg border border-green-500 hover:bg-green-100 focus:outline-none focus:ring-green-500 flex items-center"
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Create Link
        </button>
        <div className=" bg-green-100 border border-gray-300 rounded-lg w-96 flex items-center">
          <p className="py-2 px-4 flex-1">{url}</p>
          <button
            className="bg-transparent text-blue-500 font-bold py-2 px-4 rounded focus:outline-none hover:bg-blue-100"
            onClick={handleCopy}
          >
            <FontAwesomeIcon icon={faCopy} className="mr-2" />
            Copy
          </button>
        </div>
        <div>
          <h2>Employees:</h2>
          <UserTable />
        </div>
      </div>
      {/* Right Side */}
      <div className="py-4 px-4">
        <div className="bg-orange-100 p-4 rounded-lg shadow-lg">
          <TeamRoles />
        </div>
      </div>
    </div>
  )
}

export default Administration
