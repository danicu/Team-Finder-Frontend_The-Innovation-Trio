import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import Departments from "./pages/Departments"
import Projects from "./pages/Projects"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import EmployeeRegister from "./pages/EmployeeRegister"
import Administration from "./pages/Administration"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Departments />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/administration" element={<Administration />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/employeeregister" element={<EmployeeRegister />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
