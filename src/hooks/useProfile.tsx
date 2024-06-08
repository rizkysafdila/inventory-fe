import { useEffect, useState } from "react"
import { getUserProfile, updateUserProfile } from '../services/profileService'
import { TProfile } from "../types/profile"

export const useProfile = () => {
  const [profile, setProfile] = useState<TProfile | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUserProfile = async () => {
    try {
      const profile = await getUserProfile()
      setProfile(profile)
      return Promise.resolve()
    } catch (err) {
      setError('Error fetching user profile')
      return Promise.reject(err)
    }
  }

  const editUserProfile = async (updatedItem: TProfile) => {
    setLoading(true)
    try {
      await updateUserProfile(updatedItem)
      fetchUserProfile()
      return Promise.resolve()
    } catch (err) {
      setError('Failed updating user')
      return Promise.reject(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserProfile()
  }, [])

  return {
    loading,
    error,
    profile,
    fetchUserProfile,
    editUserProfile,
  }
}