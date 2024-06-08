import React, { useState } from "react"
import DefaultLayout from "../../layout/DefaultLayout"
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb"
import Table from "../../components/Table/Table"
import { AdminLoaningTableHeader } from '../../constants/table.constant'
import { ToastContainer, toast } from "react-toastify"
import { useLoan } from "../../hooks/useLoan"
import { formatDate } from "../../utils/helpers"
import { useInventory } from "../../hooks/useInventory"
import ApprovalConfirmationModal from "../../components/Modal/ModalApprove"
import Modal from "../../components/Modal/Modal"

const AdminLoaning: React.FC = () => {
  const { loans, approve, reject, returnLoanItem, loading } = useLoan() // Assuming you have an approveLoan function in your hook
  const { inventories } = useInventory()
  const [processItemId, setProcessItemId] = useState<number | null>(null)
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false)

  // Approval
  const handleApproval = (id: number) => {
    setProcessItemId(id)
    setIsApproveModalOpen(true)
  }

  // Approve
  const handleConfirmApproval = async () => {
    if (processItemId !== null) {
      try {
        await approve(processItemId)
        setIsApproveModalOpen(false)
        toast.success("Loan approved successfully")
      } catch (err) {
        toast.error(`Error approving loan: ${err}`)
      }
    }
  }

  // Reject
  const handleRejectApproval = async () => {
    if (processItemId !== null) {
      try {
        await reject(processItemId)
        setIsApproveModalOpen(false)
        toast.success("Loan rejected successfully")
      } catch (err) {
        toast.error(`Error rejecting loan: ${err}`)
      }
    }
  }

  // Return
  const handleReturnLoan = (id: number) => {
    setProcessItemId(id)
    setIsReturnModalOpen(true)
  }

  const handleConfirmReturnLoan = async () => {
    if (processItemId !== null) {
      try {
        await returnLoanItem(processItemId)
        setIsReturnModalOpen(false)
        toast.success("Loan returned successfully")
      } catch (err) {
        toast.error(`Error returning loan: ${err}`)
      }
    }
  }

  // Loan Data
  const data = loans.map((item) => ({
    ...item,
    ID: item.id_peminjaman,
    name: item.user.nama,
    item: item.barang.nama_barang,
    tgl_pinjam: formatDate(item.tgl_pinjam),
    durasi_pinjam: formatDate(item.durasi_pinjam),
    tgl_kembali: item.tgl_kembali ? formatDate(item.tgl_kembali) : '-',
  }))

  // Inventory select items
  const availableItems = inventories
    .filter(item => item.status === 1)
    .map(item => ({
      text: item.nama_barang,
      value: item.id_barang as any
    }))

  const statusMapping = {
    0: 'PENDING',
    1: 'APPROVED',
    2: 'REJECTED',
    3: 'COMPLETED',
  }

  return (
    <DefaultLayout>
      <ToastContainer
        theme="colored"
        autoClose={1500}
        hideProgressBar
        closeButton={false}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
      <Breadcrumb pageName="Loaning" />

      <Table
        headers={AdminLoaningTableHeader}
        data={data}
        statusMapping={statusMapping}
        onProcessApproval={handleApproval} // Pass handleApproval directly
        onReturnLoan={handleReturnLoan}
      />

      <Modal
        title="Confirm Item Return"
        isOpen={isReturnModalOpen}
        onClose={() => setIsReturnModalOpen(false)}
        footer={
          <button
            type="button"
            className="text-white bg-primary border border-primary hover:border-black hover:bg-black font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary dark:hover:bg-primary/90 dark:hover:border-primary/90 transition-colors duration-200"
            onClick={handleConfirmReturnLoan}
          >
            {loading ? "Loading..." : "Confirm"}
          </button>
        }
      >
        <p className='text-black dark:text-slate-400'>Are you sure you want to confirm this item already returned?</p>
      </Modal>

      <ApprovalConfirmationModal
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        onApprove={handleConfirmApproval}
        onRejected={handleRejectApproval}
        loading={loading}
      />
    </DefaultLayout>
  )
}

export default AdminLoaning
