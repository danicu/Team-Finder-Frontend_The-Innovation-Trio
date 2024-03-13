import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faCopy, faUser } from "@fortawesome/free-solid-svg-icons"
import Modal from "react-modal"
import { Center } from "@mantine/core"

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

        {/* Delimitarea cu dungă pentru secțiunea Employees */}

        <div className="mt-2">
          <h1 className="px-2">Employees</h1>
          <table>
            <tbody>
              <tr className="border-b">
                <td className="px-2">
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Poliec Daniel
                </td>
                <td className="px-2">Frontend Department</td>
                <td className="px-2">React, JavaScript, HTML5</td>
                <td className="px-2">
                  <button onClick={openModal}>Edit</button>
                  <Modal
                    style={{
                      overlay: {
                        position: "fixed",
                        top: 100,
                        left: 400,
                        right: 10,
                        bottom: 10,
                        backgroundColor: "rgba(0, 0, 0, 0)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                      content: {
                        width: "20%",
                        height: "20%",
                        backgroundColor: "white",
                        borderRadius: "8px",
                        padding: "20px",
                      },
                    }}
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className=""
                  >
                    <h2>Roles</h2>
                    <label>
                      <input type="checkbox" /> Organization administration
                    </label>
                    <br />
                    <label>
                      <input type="checkbox" /> Employee
                    </label>
                    <br />
                    <label>
                      <input type="checkbox" /> Department Manager
                    </label>
                    <br />
                    <label>
                      <input type="checkbox" /> Project Manager
                    </label>
                    <br />
                    <button onClick={closeModal} style={{ float: "right" }}>
                      Confirmare
                    </button>
                  </Modal>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Right Side */}
      <div className="w-full">
        <div className="bg-gray-200 p-4 rounded-lg shadow-lg">
          <h1>Team Roles</h1>
          <div className="bg-yellow-200 py-3 rounded-lg shadow-lg">
            <h1>Test</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Administration
