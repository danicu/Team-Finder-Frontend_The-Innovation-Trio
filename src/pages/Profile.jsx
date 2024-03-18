import React, { useEffect, useState } from "react"
import api from "../api"

const Profile = () => {
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

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Welcome, {user.userName}!</h2>
      <p>Email: {user.email}</p>
      {/* Render other user details */}
    </div>
  )
}

export default Profile
