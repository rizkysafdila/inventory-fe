import React from 'react'
import { Navigate, PathRouteProps } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface ProtectedRouteProps extends PathRouteProps {
    element: React.ReactElement
    requiredRole?: 'admin' | 'user' | null
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, requiredRole = null }) => {
    const { isAuthenticated, role } = useAuth()

    if (!isAuthenticated) {
        return <Navigate to="/sign-in" />
    }

    if (!isAuthenticated && role !== requiredRole) {
        return <Navigate to="/unauthorized" />
    }

    return element
}

export default ProtectedRoute
