import React, { useState, useEffect } from "react"
import api from "../api"

const getDepartments = async () => {
  // Înlocuirea numelui funcției cu "getDepartments"
  try {
    const token = localStorage.getItem("token")
    const config = {
      method: "get",
      url: "/departments/same-organization", // Modificarea URL-ului pentru a solicita departamentele
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await api(config)

    if (response.status === 200) {
      const departmentsData = response.data // Modificarea variabilei de la "usersData" la "departmentsData"
      return departmentsData
    } else {
      throw new Error(
        `Error retrieving departments. Status code: ${response.status}`
      )
    }
  } catch (error) {
    throw new Error(`Error retrieving departments: ${error.message}`)
  }
}

const AssignManagerCard = ({
  department,
  assignManager = () => {},
  unassignedManagers = [],
  assignedManagers = [],
}) => {
  const [selectedManagerId, setSelectedManagerId] = useState("")

  const handleAssignManager = () => {
    if (selectedManagerId !== "") {
      assignManager(department.id, selectedManagerId)
    } else {
      console.log("Select a manager before assigning.")
    }
  }

  const managerObject = assignedManagers.find(
    (manager) => manager.id === department.departmentManager
  )

  console.log(managerObject)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleAssignManager()
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
        {managerObject ? (
          <p>Are manager: {managerObject.userName}</p>
        ) : (
          <select
            value={selectedManagerId}
            onChange={(e) => setSelectedManagerId(e.target.value)}
            className="w-full px-4 py-2 border-b border-gray-600 bg-transparent focus:outline-none focus:border-blue-500"
          >
            <option value="">Select a manager</option>
            {unassignedManagers.map((manager) => (
              <option key={manager.id} value={manager.id}>
                {manager.userName}
              </option>
            ))}
          </select>
        )}
      </div>
      <button
        type="submit"
        className="py-3 px-7 bg-blue-500 text-white font-bold rounded-lg"
      >
        Assign Manager
      </button>
    </form>
  )
}

const DepartmentCard = ({ onSubmit }) => {
  const [departmentName, setDepartmentName] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(departmentName)
    setDepartmentName("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-96 h-52 bg-gray-200 rounded-3xl px-8 py-4 flex flex-col items-end"
    >
      <div className="flex-1 w-3/4 mx-auto mb-2">
        <input
          type="text"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
          required
          placeholder="Department name"
          className="w-full px-4 py-2 border-b border-gray-600 bg-transparent focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="py-4 px-7 bg-blue-500 text-white font-bold rounded-lg"
      >
        Add Department
      </button>
    </form>
  )
}

const Departments = () => {
  const [departments, setDepartments] = useState([])
  const [unassignedManagers, setUnassignedManagers] = useState([])
  const [assignedManagers, setAssignedManagers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      let departmentsData = []

      try {
        departmentsData = await getDepartments()
        setDepartments(departmentsData)
      } catch (error) {
        console.error("Error fetching departments:", error)
      }

      try {
        const response = await api.get("/users/same-organization")
        const umanagers = response.data.filter((user) => {
          const isManager = user.roles.includes("Department_Manager")
          const isUnnasigned = !departmentsData
            .map((department) => department.departmentManager)
            .includes(user.id)

          return isManager && isUnnasigned
        })

        const amanagers = response.data.filter((user) => {
          const isManager = user.roles.includes("Department_Manager")
          const isUnnasigned = !departmentsData
            .map((department) => department.departmentManager)
            .includes(user.id)

          return isManager && !isUnnasigned
        })
        setUnassignedManagers(umanagers)
        setAssignedManagers(amanagers)
      } catch (error) {
        console.error("Error fetching unassigned managers:", error)
      }
    }

    fetchData()
  }, [])

  const createDepartment = async (departmentName) => {
    try {
      const response = await api.post("/departments", { name: departmentName })
      const newDepartment = response.data
      setDepartments((departments) => [...departments, newDepartment])
    } catch (error) {
      console.error("Error creating department:", error)
    }
  }

  const assignManager = async (departmentId, managerId) => {
    console.log("Assign manager:", departmentId, managerId)
    // setDepartments((prevDepartments) =>
    //   prevDepartments.map((department) =>
    //     department.id === departmentId
    //       ? { ...department, managerId: managerId }
    //       : department
    //   )
    // )

    try {
      const response = await api.put(`/departments/${departmentId}`, {
        departmentManager: managerId,
      })

      // const managers = response.data.filter((user) =>
      //   user.roles.includes("Department_Manager")
      // )
      // setUnassignedManagers(managers)
    } catch (error) {
      console.error("Error assigning manager:", error)
    }
  }

  console.log(departments)

  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-8 p-8">
        <DepartmentCard onSubmit={createDepartment} />

        {departments
          .filter((department) => department.departmentManager === null)
          .map((department) => (
            <AssignManagerCard
              key={department.id}
              department={department}
              assignManager={assignManager}
              unassignedManagers={unassignedManagers}
            />
          ))}
      </div>
      <div className="flex flex-col gap-8 p-8">
        {departments
          .filter((department) => department.departmentManager !== null)
          .map((department) => (
            <AssignManagerCard
              key={department.id}
              department={department}
              assignManager={assignManager}
              unassignedManagers={unassignedManagers}
              assignedManagers={assignedManagers}
            />
          ))}
      </div>
    </div>
  )
}

export default Departments
