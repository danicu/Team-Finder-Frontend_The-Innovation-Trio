import React, { useState, useEffect } from "react"

const TeamRoles = () => {
  const [roles, setRoles] = useState([])
  const [newRoleName, setNewRoleName] = useState("")
  const [editingRole, setEditingRole] = useState(null)
  const [editedRoleName, setEditedRoleName] = useState("")

  useEffect(() => {
    setRoles([
      { id: 1, name: "Manager" },
      { id: 2, name: "Developer" },
      { id: 3, name: "Designer" },
    ])
  }, [])

  const handleDelete = (roleId) => {
    setRoles((prevRoles) => prevRoles.filter((role) => role.id !== roleId))
  }

  const handleEdit = (role) => {
    setEditingRole(role.id)
    setEditedRoleName(role.name)
  }

  const handleSaveEdit = (roleId) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.id === roleId ? { ...role, name: editedRoleName } : role
      )
    )
    setEditingRole(null)
  }

  const handleAddRole = () => {
    if (newRoleName.trim() === "") {
      return
    }

    const newRole = {
      id: roles.length + 1,
      name: newRoleName.trim(),
    }

    setRoles((prevRoles) => [...prevRoles, newRole])
    setNewRoleName("")
  }

  return (
    <div>
      <h2>Team Roles</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Numele noului rol"
          value={newRoleName}
          onChange={(e) => setNewRoleName(e.target.value)}
          className="w-[364px] h-12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleAddRole}
          className="ml-2 bg-purple-600 text-white font-bold rounded-lg px-4 py-2 focus:outline-none"
        >
          Adăugare Rol
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>
                {editingRole === role.id ? (
                  <input
                    type="text"
                    value={editedRoleName}
                    onChange={(e) => setEditedRoleName(e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  role.name
                )}
              </td>
              <td>
                {editingRole === role.id ? (
                  <button
                    className="px-2"
                    onClick={() => handleSaveEdit(role.id)}
                  >
                    Save
                  </button>
                ) : (
                  <button className="px-2" onClick={() => handleEdit(role)}>
                    Edit
                  </button>
                )}
                <button className="px-2" onClick={() => handleDelete(role.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TeamRoles
