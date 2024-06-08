import { useEffect, useState } from 'react'
import {
  getAllUsers,
  getUserById,
  storeUser,
  updateUser,
  deleteUser,
  resetPassword,
} from '../services/userService'
import { TUser } from '../types/user'

export const useUser = () => {
  const [user, setUser] = useState<TUser>()
  const [users, setUsers] = useState<TUser[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = async () => {
    try {
      const users = await getAllUsers()
      setUsers(users)
      return Promise.resolve()
    } catch (err) {
      setError('Error fetching users')
      return Promise.reject(err)
    } finally {
      setLoading(false)
    }
  }
  
  const fetchUserById = async (id: number) => {
    try {
      const user = await getUserById(id)
      setUser(user)
      return Promise.resolve()
    } catch (err) {
      setError('Error fetching users')
      return Promise.reject(err)
    } finally {
      setLoading(false)
    }
  }

  const addUser = async (newUser: TUser) => {
    try {
      await storeUser(newUser)
      fetchUsers()
      return Promise.resolve()
    } catch (err) {
      setError('Failed adding user')
      return Promise.reject(err)
    }
  }

  const editUser = async (id: number, updatedItem: TUser) => {
    try {
      await updateUser(id, updatedItem)
      fetchUsers()
      return Promise.resolve()
    } catch (err) {
      setError('Failed updating user')
      return Promise.reject(err)
    }
  }

  const removeUser = async (id: number) => {
    try {
      await deleteUser(id)
      fetchUsers()
      return Promise.resolve()
    } catch (err) {
      setError('Failed deleting user')
      return Promise.reject(err)
    }
  }

  const changePassword = async (id: number, newPassword: string) => {
    try {
      await resetPassword(id, newPassword)
      return Promise.resolve()
    } catch (err) {
      setError('Failed update password')
      return Promise.reject(err)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return {
    users,
    user,
    loading,
    error,
    fetchUsers,
    fetchUserById,
    addUser,
    editUser,
    removeUser,
    changePassword,
  }
}