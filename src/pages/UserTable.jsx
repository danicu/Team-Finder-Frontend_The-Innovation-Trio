import React, { useState, useEffect } from "react"
import api from "../api"

function UserTable() {
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token")
      const config = {
        method: "get",
        url: "/users",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await api(config)

      if (response.status === 200) {
        const usersData = response.data
        return usersData
      } else {
        throw new Error(
          `Error retrieving users. Status code: ${response.status}`
        )
      }
    } catch (error) {
      throw new Error(`Error retrieving users: ${error.message}`)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsers()
        setUsers(usersData)
        console.log("Users:", usersData)
      } catch (error) {
        console.error(error.message)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Available Hours</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.roles.join(", ")}</td>
              <td>{user.availableHours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable
