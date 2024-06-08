import React, { useState } from "react"
import DefaultLayout from "../../layout/DefaultLayout"
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb"
import Table from "../../components/Table/Table"
import { UserTableHeader } from '../../constants/table.constant'
import { ToastContainer, toast } from "react-toastify"
import { TbPlus } from "react-icons/tb"
import { useUser } from "../../hooks/useUser"
import { TUser } from "../../types/user"
import FormInput from "../../components/Forms/Input/Input"
import FormSelect from "../../components/Forms/Select/Select"
import Modal from "../../components/Modal/Modal"
import DeleteConfirmationModal from "../../components/Modal/ModalDelete"

const User: React.FC = () => {  
  const {
    users,
    addUser,
    editUser,
    removeUser,
  } = useUser()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentItemId, setCurrentItemId] = useState<number | null>(null)
  const [formData, setFormData] = useState<TUser>({
    nama: "",
    email: "",
    password: "",
    telepon: "",
    nik: "",
    divisi: "",
    is_admin: 0,
    perusahaan: "Nongsa Digital Park",
  })
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null)
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false)

  // Open and Set data to modal
  const openModal = (item?: TUser) => {
    setIsEditMode(!!item)
    setIsModalOpen(true)
    if (item) {
      setCurrentItemId(item.id_user as number)
      setFormData(item)
    } else {
      setFormData({
        nama: "",
        email: "",
        password: "",
        telepon: "",
        nik: "",
        divisi: "",
        is_admin: 0,
        perusahaan: "Nongsa Digital Park",
      } as TUser)
    }
  }

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false)
    setIsEditMode(false)
    setCurrentItemId(null)
    setFormData({
      nama: "",
      email: "",
      password: "",
      telepon: "",
      nik: "",
      divisi: "",
      is_admin: 0,
      perusahaan: "Nongsa Digital Park",
    } as TUser)
  }

  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // Create and Update User
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isEditMode && currentItemId) {
        await editUser(currentItemId, formData)
      } else {
        await addUser(formData)
      }
      closeModal()
      toast.success(isEditMode ? "Data Updated" : "Data Added")
    } catch (error) {
      closeModal()
      toast.error(isEditMode ? "Error Updating Data" : "Error Adding Data")
    }
  }

  // Delete User
  const handleDeleteItem = (id: number) => {
    setDeleteItemId(id)
    setIsDeleteConfirmationOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (deleteItemId !== null) {
      try {
        await removeUser(deleteItemId)
        setIsDeleteConfirmationOpen(false)
        toast.success("User deleted successfully")
      } catch (err) {
        toast.error(`Error deleting user: ${err}`)
      }
    }
  }

  // User role mappin
  const roleMapping = {
    0: 'USER',
    1: 'ADMIN'
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
      <Breadcrumb pageName="User" />

      <Table
        headers={UserTableHeader}
        data={users}
        statusMapping={roleMapping}
        createButton={(
          <button
            type="button"
            className="flex items-center gap-2 text-white bg-primary hover:bg-black font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary dark:hover:bg-primary/90 transition-colors duration-200"
            onClick={() => openModal()}
          >
            <TbPlus size={18} />
            Create User
          </button>
        )}
        onEdit={openModal}
        onDeleteUser={handleDeleteItem}
      />

      <Modal
        title={isEditMode ? "Edit User" : "Create User"}
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
              name="nama"
              onChange={handleChange}
              value={formData.nama}
              label="Full Name"
              placeholder="Enter fullname"
            />
            <FormInput
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              label="Email"
              placeholder="Enter email"
            />
            <FormInput
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              label="Password"
              placeholder="••••••••"
            />
            <FormInput
              type="text"
              name="telepon"
              onChange={handleChange}
              value={formData.telepon}
              label="Phone Number"
              placeholder="Enter phone number"
            />
            <FormInput
              type="text"
              name="nik"
              onChange={handleChange}
              value={formData.nik}
              label="NIK"
              placeholder="Enter NIK"
            />
            <FormInput
              type="text"
              name="divisi"
              onChange={handleChange}
              value={formData.divisi}
              label="Division"
              placeholder="Enter division"
            />
            <FormSelect
              name="perusahaan"
              label="Company"
              onChange={handleChange}
              value={formData.perusahaan}
              items={[
                { text: "Nongsa Digital Park", value: "Nongsa Digital Park" },
                { text: "Infinite Learning Indonesia", value: "Infinite Learning Indonesia" },
              ]}
            />
            <FormSelect
              name="is_admin"
              label="Role"
              onChange={handleChange}
              value={formData.is_admin}
              items={[
                { text: "User", value: "0" },
                { text: "Admin", value: "1" },
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

export default User