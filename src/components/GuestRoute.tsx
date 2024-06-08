import React from 'react'
import { Navigate, PathRouteProps } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface GuestRouteProps extends PathRouteProps {
    element: React.ReactElement
}

const GuestRoute: React.FC<GuestRouteProps> = ({ element }) => {
    const { isAuthenticated, loading } = useAuth()

    if (loading) {
        return <div></div> // Add your loading indicator here
    }

    return !isAuthenticated ? element : <Navigate to="/dashboard" />
}

export default GuestRoute
