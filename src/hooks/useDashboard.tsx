import { useEffect, useState } from "react"
import { getDashboardStats } from "../services/dashboardService"

export const useDashboard = () => {
    const [totalInventory, setTotalInventory] = useState(0)
    const [totalReadyInventory, setTotalReadyInventory] = useState(0)
    const [totalMaintenanceInventory, setTotalMaintenanceInventory] = useState(0)
    const [totalLateReturnLoan, setTotalLateReturnLoan] = useState(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const fetchDashboardStats = async () => {
        setLoading(true)
        try {
            const stats = await getDashboardStats()         

            setTotalInventory(stats.total_barang)
            setTotalReadyInventory(stats.total_ready_barang)
            setTotalMaintenanceInventory(stats.total_not_ready_barang)
            setTotalLateReturnLoan(stats.total_late_peminjaman_durasi)

            return Promise.resolve()
        } catch (err) {
            setError('Error fetching dashboard stats')
            return Promise.reject(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDashboardStats()
    }, [])

    return {
        totalInventory,
        totalReadyInventory,
        totalMaintenanceInventory,
        totalLateReturnLoan,
    }
}