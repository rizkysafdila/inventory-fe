import Axios from '../api/axios'
import type { TProfile } from '../types/profile'
import type { TUser } from '../types/user'

export const getAllUsers = async (): Promise<TUser[]> => {
    try {
        const response = await Axios.get<TUser[]>('/users')
        return response.data
    } catch (err) {
        return Promise.reject(err)
    }
}

export const getUserById = async (id: number): Promise<TUser> => {
    try {
        const response = await Axios.get<TUser>(`/users/${id}`)
        return response.data
    } catch (err) {
        return Promise.reject(err)
    }
}

export const storeUser = async (data: TUser): Promise<void> => {
    try {
        await Axios.post<TUser>('/users', data)
        return Promise.resolve()
    } catch (err) {
        return Promise.reject(err)
    }
}

export const updateUser = async (id: number, data: TUser): Promise<void> => {
    try {
        await Axios.put<TUser>(`/users/${id}`, data)
        return Promise.resolve()
    } catch (err) {
        return Promise.reject(err)
    }
}

export const deleteUser = async (id: number): Promise<void> => {
    try {
        await Axios.delete(`/users/${id}`)
        return Promise.resolve()
    } catch (err) {
        return Promise.reject(err)
    }
}

export const resetPassword = async (id: number, data: string): Promise<void> => {
    try {
        await Axios.put<TProfile>(`/users/${id}/password`, { password: data })
        return Promise.resolve()
    } catch (err) {
        return Promise.reject(err)
    }
}
