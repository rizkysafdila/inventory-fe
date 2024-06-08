import Axios from "../api/axios"

export const getDashboardStats = async () => {
    try {
        const response = await Axios.get('/dashboard')
        return response.data
    } catch (err) {
        return Promise.reject(err)
    }
}