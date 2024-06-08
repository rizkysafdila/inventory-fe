import Axios from '../api/axios'
import type { TLoan, TLoanForm } from '../types/loan'

export const getAllLoans = async (): Promise<TLoan[]> => {
    const response = await Axios.get<TLoan[]>('/peminjaman')
    return response.data
}

export const getLoanByUser = async (): Promise<TLoan[]> => {
    const response = await Axios.get<TLoan[]>('peminjaman/user')
    return response.data
}

export const createLoan = async (data: TLoanForm): Promise<void> => {
    try {
        await Axios.post<TLoanForm>('/peminjaman', data)
        return Promise.resolve()
    } catch (err) {
        return Promise.reject(err)
    }
}

export const updateLoan = async (id: number, data: TLoanForm): Promise<void> => {
    // return console.log(id, data, 'loan service')
    try {
        await Axios.put<TLoanForm>(`/peminjaman/${id}`, data)
        return Promise.resolve()
    } catch (err) {
        return Promise.reject(err)
    }
}

export const approveLoan = async (id: number): Promise<void> => {
    try {
        await Axios.put(`/peminjaman/${id}/approve`)
        return Promise.resolve()
    } catch (err) {
        return Promise.reject(err)
    }
}

export const rejectLoan = async (id: number): Promise<void> => {
    try {
        await Axios.put(`/peminjaman/${id}/reject`)
        return Promise.resolve()
    } catch (err) {
        return Promise.reject(err)
    }
}

export const returnLoan = async (id: number): Promise<void> => {
    try {
        await Axios.put(`/peminjaman/${id}/return`)
        return Promise.resolve()
    } catch (err) {
        return Promise.reject(err)
    }
}