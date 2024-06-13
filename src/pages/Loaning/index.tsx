import React, { useState } from "react"
import DefaultLayout from "../../layout/DefaultLayout"
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb"
import Table from "../../components/Table/Table"
import { LoaningTableHeader } from '../../constants/table.constant'
import Modal from "../../components/Modal/Modal"
import { ToastContainer, toast } from "react-toastify"
import { useLoan } from "../../hooks/useLoan"
import { formatDate } from "../../utils/helpers"
import { TLoan, TLoanForm } from "../../types/loan"
import { TbPlus } from "react-icons/tb"
import FormInput from "../../components/Forms/Input/Input"
import { useInventory } from "../../hooks/useInventory"
import FormSelect from "../../components/Forms/Select/Select"
import { useProfile } from "../../hooks/useProfile"
import FormTextarea from "../../components/Forms/Textarea/Textarea"

const Loaning: React.FC = () => {
  const { profile } = useProfile()
  const {
    userLoans,
    makeLoan,
    editLoan,
    loading,
  } = useLoan()
  const { inventories } = useInventory()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentItemId, setCurrentItemId] = useState<number | null>(null)
  const [formData, setFormData] = useState<TLoanForm>({
    id_barang: "default",
    id_user: profile?.userId,
    ket: "",
    qty: 0,
    tgl_pinjam: "",
    durasi_pinjam: "",
    tgl_kembali: "",
    status: 0,
  } as any)

  // Open and Set data to modal
  const openModal = (item?: TLoan | TLoanForm) => {
    setIsEditMode(!!item)
    setIsModalOpen(true)
    if (item) {
      setCurrentItemId(item.id_peminjaman as number)
      setFormData(item as any)
    } else {
      setFormData({
        id_barang: "default",
        id_user: profile?.userId,
        ket: "",
        qty: 0,
        tgl_pinjam: "",
        durasi_pinjam: "",
        tgl_kembali: "",
        status: 0,
      } as any)
    }
  }

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false)
    setIsEditMode(false)
    setCurrentItemId(null)
    setFormData({
      id_barang: "default",
      id_user: profile?.userId,
      ket: "",
      qty: 0,
      tgl_pinjam: "",
      durasi_pinjam: "",
      tgl_kembali: "",
      status: 0,
    } as any)
  }

  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // Create and Update Loan
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isEditMode && currentItemId) {
        await editLoan(currentItemId, formData)
      } else {
        await makeLoan(formData)
      }
      closeModal()
      toast.success(isEditMode ? "Your loan has been updated" : "Your loan has been submitted")
    } catch (error) {
      closeModal()
      toast.error(isEditMode ? "Error updating your loan" : "Error submitting your loan")
    }
  }

  // Loan Data
  const data = userLoans.map((item) => ({
    ...item,
    // name: item.user.nama,
    item: item.barang.nama_barang,
    kepemilikan: item.barang.kepemilikan,
    tgl_pinjam: formatDate(item.tgl_pinjam),
    durasi_pinjam: formatDate(item.durasi_pinjam),
    tgl_kembali: item.tgl_kembali ? formatDate(item.tgl_kembali) : '-',
  }))

  // Inventory select items
  const availableItems = inventories
    .filter(item => item.status === 1)
    .map(item => ({
      text: `${item.nama_barang} - ${item.kepemilikan}`,
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
        headers={LoaningTableHeader}
        data={data}
        statusMapping={statusMapping}
        createButton={(
          <button
            type="button"
            className="flex items-center gap-2 text-white bg-primary hover:bg-black font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary dark:hover:bg-primary/90 transition-colors duration-200"
            onClick={() => openModal()}
          >
            <TbPlus size={18} />
            Make Loan
          </button>
        )}
        onEditLoan={openModal}
      />

      <Modal
        title="Create Loan"
        isOpen={isModalOpen}
        onClose={closeModal}
        footer={
          <button
            type="button"
            className="text-white bg-primary border border-primary hover:border-black hover:bg-black font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary dark:hover:bg-primary/90 dark:hover:border-primary/90 transition-colors duration-200"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Loading..." : "Save"}
          </button>
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="mt-5 flex flex-col gap-3">
            <FormSelect
              name="id_barang"
              label="Item"
              onChange={handleChange}
              value={formData.id_barang}
              items={
                availableItems.length !== 0 ? availableItems : [{ text: 'No Item Ready', value: null }]
              }
              disabled={availableItems.length === 0}
            />
            <FormInput
              type="number"
              minNumber={0}
              name="qty"
              value={formData.qty?.toString()}
              onChange={handleChange}
              onFocus={() => setFormData(prevData => ({ ...prevData, qty: '' as any }))}
              label="Quantity"
              placeholder="Enter quantity"
            />
            <FormInput
              type="date"
              name="tgl_pinjam"
              onChange={handleChange}
              value={formData.tgl_pinjam}
              label="Loan Date"
            />
            <FormInput
              type="date"
              name="durasi_pinjam"
              onChange={handleChange}
              value={formData.durasi_pinjam}
              label="Duration"
            />
            <FormTextarea
              name="ket"
              value={formData.ket}
              onChange={handleChange}
              label="Description"
            />
          </div>
        </form>
      </Modal>
    </DefaultLayout>
  )
}

export default Loaning