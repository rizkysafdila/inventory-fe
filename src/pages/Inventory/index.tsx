import React, { useState } from "react"
import DefaultLayout from "../../layout/DefaultLayout"
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb"
import Table from "../../components/Table/Table"
import { InventoryTableHeader } from "../../constants/table.constant"
import { useInventory } from "../../hooks/useInventory"
import { formatDate } from "../../utils/helpers"
import Modal from "../../components/Modal/Modal"
import { TbPlus } from "react-icons/tb"
import FormInput from "../../components/Forms/Input/Input"
import FormSelect from "../../components/Forms/Select/Select"
import { TInventory } from "../../types/inventory"
import { ToastContainer, toast } from "react-toastify"
import DeleteConfirmationModal from "../../components/Modal/ModalDelete"

const Inventory: React.FC = () => {
  const {
    inventories,
    error,
    addInventoryItem,
    editInventoryItem,
    removeInventoryItem,
  } = useInventory()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentItemId, setCurrentItemId] = useState<number | null>(null)
  const [formData, setFormData] = useState<TInventory>({
    nama_barang: "",
    nomor_seri: "",
    jumlah: 0,
    supplier: "",
    kepemilikan: "",
    status: 1,
    tgl_pembelian: "",
  })
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null)
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false)

  const openModal = (item?: TInventory) => {
    setIsEditMode(!!item)
    setIsModalOpen(true)
    if (item) {
      setCurrentItemId(item.id_barang as number)
      setFormData(item)
    } else {
      setFormData({
        nama_barang: "",
        nomor_seri: "",
        jumlah: 0,
        supplier: "",
        kepemilikan: "",
        status: 1,
        tgl_pembelian: "",
      } as TInventory)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setIsEditMode(false)
    setCurrentItemId(null)
    setFormData({
      nama_barang: "",
      nomor_seri: "",
      jumlah: 0,
      supplier: "",
      kepemilikan: "",
      status: 1,
      tgl_pembelian: "",
    } as TInventory)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {    
    e.preventDefault()
    try {
      if (isEditMode && currentItemId) {
        await editInventoryItem(currentItemId, formData)
      } else {
        await addInventoryItem(formData)
      }
      closeModal()
      toast.success(isEditMode ? "Data Updated" : "Data Added")
    } catch (error) {
      closeModal()
      toast.error(isEditMode ? "Error Updating Data" : "Error Adding Data")
    }
  }

  const handleDeleteItem = (id: number) => {
    setDeleteItemId(id)
    setIsDeleteConfirmationOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (deleteItemId !== null) {
      try {
        await removeInventoryItem(deleteItemId)
        setIsDeleteConfirmationOpen(false)
        toast.success("Item deleted successfully")
      } catch (error) {
        setIsDeleteConfirmationOpen(false)
        toast.error("Error deleting item")
      }
    }
  }

  // Inventory data
  const data = inventories.map((item) => ({
    ...item,
    tgl_pembelian: formatDate(item.tgl_pembelian),
  }))

  // Status mapping
  const statusMapping = {
    0: 'MAINTENANCE',
    1: 'READY'
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
      <Breadcrumb pageName="Inventory" />

      <Table
        headers={InventoryTableHeader}
        data={data}
        statusMapping={statusMapping}
        createButton={
          <button
            type="button"
            className="flex items-center gap-2 text-white bg-primary hover:bg-black font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary dark:hover:bg-primary/90 transition-colors duration-200"
            onClick={() => openModal()}
          >
            <TbPlus size={18} />
            Add Item
          </button>
        }
        onEdit={openModal}
        onDeleteInventory={handleDeleteItem}
      />

      <Modal
        title={isEditMode ? "Edit Inventory Item" : "Add Inventory Item"}
        isOpen={isModalOpen}
        onClose={closeModal}
        footer={
          <button
            type="button"
            className="text-white bg-primary border border-primary hover:border-black hover:bg-black font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary dark:hover:bg-primary/90 dark:hover:border-primary/90 transition-colors duration-200"
            onClick={handleSubmit}
          >
            {isEditMode ? "Update" : "Save"}
          </button>
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="mt-5 flex flex-col gap-3">
            <FormInput
              type="text"
              name="nama_barang"
              onChange={handleChange}
              value={formData.nama_barang}
              label="Name"
              placeholder="Item name"
            />
            <FormInput
              type="text"
              name="supplier"
              onChange={handleChange}
              value={formData.supplier}
              label="Supplier"
              placeholder="Supplier name"
            />
            <FormInput
              type="date"
              name="tgl_pembelian"
              onChange={handleChange}
              value={formData.tgl_pembelian}
              label="Buy Date"
            />
            <FormInput
              type="text"
              name="nomor_seri"
              onChange={handleChange}
              value={formData.nomor_seri}
              label="Serial Number"
              placeholder="Item serial number"
            />
            <FormInput
              type="number"
              minNumber={0}
              name="jumlah"
              onChange={handleChange}
              onFocus={() => setFormData(prevData => ({ ...prevData, jumlah: '' as any }))}
              value={formData.jumlah.toString()}
              label="Quantity"
              placeholder="Qty"
            />
            <FormInput
              type="text"
              name="kepemilikan"
              onChange={handleChange}
              value={formData.kepemilikan}
              label="Ownership"
              placeholder="Item ownership"
            />
            <FormSelect
              name="status"
              label="Status"
              onChange={handleChange}
              value={formData.status.toString()}
              items={[
                { text: "Ready", value: "1" },
                { text: "Maintenance", value: "0" },
              ]}
            />
          </div>
        </form>
      </Modal>

      <DeleteConfirmationModal
        isOpen={isDeleteConfirmationOpen}
        onClose={() => setIsDeleteConfirmationOpen(false)}
        onConfirmDelete={handleConfirmDelete}
      />
    </DefaultLayout>
  )
}

export default Inventory
