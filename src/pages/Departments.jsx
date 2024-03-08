import React, { useId, useState } from "react"

const managers = [
  { id: 1, name: "Andrei Orsivschi" },
  { id: 2, name: "Beniamin Dumitriu" },
]

const AssignManagerCard = ({ department, assignManager }) => {
  const [manager, setManager] = useState()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        assignManager()
      }}
      className="w-full max-w-96 h-52 bg-gray-200 rounded-3xl px-8 py-4 flex flex-col items-end"
    >
      <div className="flex-1 w-3/4 mx-auto mb-2">
        <input
          type="text"
          value={department.name}
          readOnly
          className="w-full px-4 py-2 mb-2 border-b border-gray-600 bg-transparent focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Manager"
          className="w-full px-4 py-2 border-b border-gray-600 bg-transparent focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className=" py-3 px-7 bg-blue-500 text-white font-bold rounded-lg"
      >
        Assign Manager
      </button>
    </form>
  )
}

const DeparmentCard = ({ onSubmit }) => {
  const id = useId()
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const el = document.getElementById(id)
        onSubmit(el.value)
        el.value = ""
      }}
      className="w-full max-w-96 h-52 bg-gray-200 rounded-3xl px-8 py-4 flex flex-col items-end"
    >
      <div className="flex-1 w-3/4 mx-auto mb-2">
        <input
          id={id}
          type="text"
          required
          placeholder="Department name"
          className="w-full px-4 py-2 border-b border-gray-600 bg-transparent focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="py-3 px-7 bg-blue-500 text-white font-bold rounded-lg"
      >
        Add Department
      </button>
    </form>
  )
}

const Departments = () => {
  const [departments, setDepartments] = useState([
    // STRUCTURA DEPARTAMENT
    // {
    //   name: "",
    //   managerId: ""
    // }
  ])

  const createDepartment = (departmentName) => {
    const newDepartpent = {
      name: departmentName,
      managerId: "",
    }
    setDepartments((departments) => [...departments, newDepartpent])
  }

  const assignManager = (departmentId, managerId) => {
    console.log("Am primit toate datele pentru a crea departamentul!")
  }

  return (
    <div>
      {/* Coloana stange cu departament */}
      <div className="flex flex-col gap-8 p-8">
        <DeparmentCard onSubmit={createDepartment} />

        {departments
          .filter((d) => !d.managerId || !d.managerId.length)
          .map((department) => (
            <AssignManagerCard
              key={department.name}
              department={department}
              departmentName={department.name}
              onAssignManager={assignManager}
            />
          ))}
      </div>
    </div>
  )
}

export default Departments
