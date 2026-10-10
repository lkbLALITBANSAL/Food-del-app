import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes, Navigate } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import AdminLogin from './pages/AdminLogin'
import AdminGuard from './components/AdminGuard'
import { ToastContainer } from 'react-toastify'

const App = () => {
  const url = import.meta.env.VITE_API_URL

  return (
    <>
      <ToastContainer />

      <Routes>
        {/* Login/signup page is accessible without authentication */}
        <Route path="/login" element={<AdminLogin />} />

        {/* Protect all dashboard pages */}
        <Route element={<AdminGuard />}>
          <Route
            path="/"
            element={<Navigate to="/list" replace />}
          />

          <Route
            path="/add"
            element={
              <div>
                <Navbar />
                <hr />
                <div className="app-content">
                  <Sidebar />
                  <Add url={url} />
                </div>
              </div>
            }
          />

          <Route
            path="/list"
            element={
              <div>
                <Navbar />
                <hr />
                <div className="app-content">
                  <Sidebar />
                  <List url={url} />
                </div>
              </div>
            }
          />

          <Route
            path="/orders"
            element={
              <div>
                <Navbar />
                <hr />
                <div className="app-content">
                  <Sidebar />
                  <Orders url={url} />
                </div>
              </div>
            }
          />
        </Route>

        {/* Redirect unknown URLs */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App