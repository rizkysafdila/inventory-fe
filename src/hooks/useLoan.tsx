import { useEffect, useState } from 'react'
import {
  getAllLoans,
  getLoanByUser,
  createLoan,
  approveLoan,
  rejectLoan,
  returnLoan,
  updateLoan,
} from '../services/loanService'
import { TLoan, TLoanForm } from '../types/loan'

export const useLoan = () => {
  const [loans, setLoans] = useState<TLoan[]>([])
  const [userLoans, setUserLoans] = useState<TLoan[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchLoans = async () => {
    setLoading(true)
    try {
      const loans = await getAllLoans()
      setLoans(loans)
    } catch (err) {
      setError('Error fetching loan data')
    } finally {
      setLoading(false)
    }
  }

  const fetchLoanByUser = async () => {
    setLoading(true)
    try {
      const userLoans = await getLoanByUser()
      setUserLoans(userLoans)
    } catch (err) {
      setError('Error fetching loan data')
    } finally {
      setLoading(false)
    }
  }

  const makeLoan = async (newLoan: TLoanForm) => {
    setLoading(true)
    try {
      await createLoan(newLoan)
      fetchLoanByUser()
      fetchLoans()
      return Promise.resolve()
    } catch (err) {
      setError('Failed adding user')
      return Promise.reject(err)
    } finally {
      setLoading(false)
    }
  }

  const editLoan = async (id: number, updatedLoan: any) => {
    const editedLoan =  {
      id_barang: updatedLoan.barang.id_barang,
      id_user: updatedLoan.user.id_user,
      qty: updatedLoan.qty,
      ket: updatedLoan.ket,
      tgl_pinjam: updatedLoan.tgl_pinjam,
      durasi_pinjam: updatedLoan.durasi_pinjam,
    }

    // return console.log(`id_pnj: ${id}`, editedLoan)
    setLoading(true)
    try {
      await updateLoan(id, editedLoan as any)
      fetchLoanByUser()
      fetchLoans()
      return Promise.resolve()
    } catch (err) {
      setError('Failed updating loan')
      return Promise.reject(err)
    } finally {
      setLoading(false)
    }
  }

  const approve = async (id: number) => {
    setLoading(true)
    try {
      await approveLoan(id)
      fetchLoans()
      fetchLoanByUser()
      return Promise.resolve()
    } catch (err) {
      return Promise.reject(err)
    } finally {
      setLoading(false)
    }
  }

  const reject = async (id: number) => {
    setLoading(true)
    try {
      await rejectLoan(id)
      fetchLoans()
      fetchLoanByUser()
      return Promise.resolve()
    } catch (err) {
      return Promise.reject(err)
    } finally {
      setLoading(false)
    }
  }

  const returnLoanItem = async (id: number) => {
    setLoading(true)
    try {
      await returnLoan(id)
      fetchLoans()
      fetchLoanByUser()
      return Promise.resolve()
    } catch (err) {
      return Promise.reject(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLoans()
    fetchLoanByUser()
  }, [])

  return {
    loans,
    userLoans,
    loading,
    error,
    fetchLoans,
    fetchLoanByUser,
    makeLoan,
    editLoan,
    approve,
    reject,
    returnLoanItem,
  }
}