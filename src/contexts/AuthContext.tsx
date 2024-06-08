import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useLocation, useNavigate } from 'react-router-dom'
import { useProfile } from '../hooks/useProfile'

interface AuthContextType {
    isAuthenticated: boolean
    role: 'admin' | 'user' | null
    loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [role, setRole] = useState<'admin' | 'user' | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [cookies] = useCookies(['token'])
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { profile, fetchUserProfile } = useProfile()

    useEffect(() => {
        const initAuth = async () => {
            const token = cookies.token
            if (token) {
                setIsAuthenticated(true)
                if (!profile) {
                    // Fetch the profile if it's not fetched already
                    // Adjust this logic according to your useProfile hook
                    // For example:
                    // await fetchUserProfile()
                } else {
                    setRole(profile.is_admin === 1 ? 'admin' : 'user')
                } 
                navigate(pathname)
            } else {
                setIsAuthenticated(false)
                setRole(null)
                if (pathname !== '/sign-in' && pathname !== '/sign-up') {
                    navigate('/sign-in')
                }
            }
            setLoading(false)
        }

        initAuth()
    }, [cookies.token, profile, navigate, pathname])

    return (
        <AuthContext.Provider value={{ isAuthenticated, role, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
