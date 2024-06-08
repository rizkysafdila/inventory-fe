import Axios from '../api/axios'
import type { TProfile } from '../types/profile'

export const getUserProfile = async (): Promise<TProfile> => {
    const response = await Axios.get<TProfile>('/profile')
    return response.data
}

export const updateUserProfile = async (data: TProfile): Promise<void> => {
    await Axios.put<TProfile>(`/profile`, data)
}