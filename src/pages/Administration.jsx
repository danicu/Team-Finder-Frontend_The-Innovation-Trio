import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

const Administration = () => {
  return (
    <div>
      {/* Butonul "Create Link" */}
      <div className="py-5 px-5">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mb-4">
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Create Link
        </button>
      </div>

      {/* Tabelul de utilizatori */}
      <div className="border-r px-30 border-gray-600">
        <div className="py-5 px-5">
          <h1>Employees</h1>
          <table className="table-auto border-collapse w-1/2">
            <thead>
              <tr>
                <td className="border-b px-4 py-2 font-bold">User Name</td>
                <td className="border-b px-4 py-2 font-bold">Departments</td>
                <td className="border-b px-4 py-2 font-bold">Technologies</td>
              </tr>
            </thead>
            <tbody>
              {/* Aici puteți adăuga rânduri pentru fiecare utilizator */}
              <tr>
                <td className="border-b px-4 py-2">John Doe</td>
                <td className="border-b px-4 py-2">Backend</td>
                <td className="border-b px-4 py-2">JavaScript, Node.js</td>
              </tr>
              <tr>
                <td className="border-b px-4 py-2">Jane Smith</td>
                <td className="border-b px-4 py-2">Frontend</td>
                <td className="border-b px-4 py-2">HTML, CSS, React</td>
              </tr>
              {/* Adăugați aici alți utilizatori, fie dintr-un array, fie după nevoie */}
              <tr>
                <td className="border-b px-4 py-2">delete</td>
                <td className="border-b px-4 py-2">edit</td>
                <td className="border-b px-4 py-2">edit</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Administration
