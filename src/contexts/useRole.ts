import { useAuth } from './AuthContext'

export const useRole = (requiredRole: 'admin' | 'user') => {
  const { role } = useAuth()
  return role === requiredRole
}
