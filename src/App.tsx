import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import Loader from './common/Loader'
import PageTitle from './components/PageTitle'
import SignIn from './pages/Authentication/SignIn'
import SignUp from './pages/Authentication/SignUp'
import Dashboard from './pages/Dashboard'
import Inventory from './pages/Inventory'
import Loaning from './pages/Loaning'
import User from './pages/User'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import GuestRoute from './components/GuestRoute' // Import GuestRoute
import { AuthProvider } from './contexts/AuthContext'
import Unauthorized from './pages/Error/401'
import AdminLoaning from './pages/Loaning/admin'

function App() {
  const [loading, setLoading] = useState<boolean>(true)
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  return loading ? (
    <Loader />
  ) : (
    <AuthProvider>
      <Routes>
        {/* <Route
          index
          element={<Unauthorized />}
        /> */}

        {/* Auth */}
        <Route
          path="/sign-in"
          element={
            <GuestRoute
              element={
                <>
                  <PageTitle title="Sign In" />
                  <SignIn />
                </>
              }
            />
          }
        />
        <Route
          path="/sign-up"
          element={
            <GuestRoute
              element={
                <>
                  <PageTitle title="Sign Up" />
                  <SignUp />
                </>
              }
            />
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={
                <>
                  <PageTitle title="Dashboard" />
                  <Dashboard />
                </>
              }
            />
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute
              element={
                <>
                  <PageTitle title="Inventory" />
                  <Inventory />
                </>
              }
              requiredRole='admin'
            />
          }
        />
        <Route
          path="/admin-loaning"
          element={
            <ProtectedRoute
              element={
                <>
                  <PageTitle title="Loaning" />
                  <AdminLoaning />
                </>
              }
              requiredRole='admin'
            />
          }
        />
        <Route
          path="/loaning"
          element={
            <ProtectedRoute
              element={
                <>
                  <PageTitle title="Loaning" />
                  <Loaning />
                </>
              }
              requiredRole='user'
            />
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute
              element={
                <>
                  <PageTitle title="Users" />
                  <User />
                </>
              }
              requiredRole='admin'
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              element={
                <>
                  <PageTitle title="Profile" />
                  <Profile />
                </>
              }
            />
          }
        />

        <Route
          path="/unauthorized"
          element={<Unauthorized />}
        />
      </Routes>
    </AuthProvider>
  )
}

export default App
