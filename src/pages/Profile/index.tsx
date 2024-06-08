import React, { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import SelectCompany from '../../components/Forms/Select/SelectCompany'
import { useProfile } from '../../hooks/useProfile'
import DefaultLayout from '../../layout/DefaultLayout'
import { toast, ToastContainer } from 'react-toastify'
import { useUser } from '../../hooks/useUser'

const Profile: React.FC = () => {
  const { loading: updateProfileLoading, profile, editUserProfile } = useProfile()
  const { loading: updatePasswordLoading, changePassword } = useUser()
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    telepon: '',
    nik: '',
    divisi: '',
    perusahaan: ''
  })
  const [newPassword, setNewPassword] = useState({
    password: '',
  })

  useEffect(() => {
    if (profile) {
      setFormData({
        nama: profile.nama || '',
        email: profile.email || '',
        telepon: profile.telepon || '',
        nik: profile.nik || '',
        divisi: profile.divisi || '',
        perusahaan: profile.perusahaan || ''
      })
    }
  }, [profile])

  // Handle profile form fields change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  // Handle password form field change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewPassword((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  // Update Profile
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await editUserProfile(formData)
      toast.success("Success update profile")
    } catch (err) {
      toast.error("Failed update profile")
    }
  }

  // Update Password
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await changePassword(profile?.userId as number, newPassword.password)
      toast.success("Password updated successfully")
      setNewPassword({ password: '' }) // Clear the password input
    } catch (err) {
      toast.error("Failed to update password")
    }
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
      <Breadcrumb pageName="Profile" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Profile Settings --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Profile Settings
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Phone
                  </label>
                  <div className="relative">
                    <span className='absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none'>+62</span>
                    <input
                      type="text"
                      name="telepon"
                      value={formData.telepon}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent ps-13 py-3 pr-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    NIK
                  </label>
                  <input
                    type="text"
                    name="nik"
                    value={formData.nik}
                    onChange={handleChange}
                    placeholder="Enter your NIK"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Division
                  </label>
                  <input
                    type="text"
                    name="divisi"
                    value={formData.divisi}
                    onChange={handleChange}
                    placeholder="Enter your division"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <SelectCompany
                  selectedOption={formData.perusahaan}
                  onChange={(value) => setFormData((prevData) => ({
                    ...prevData,
                    company: value
                  }))}
                />

                <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  {updateProfileLoading ? 'Loading...' : 'Update Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          {/* <!-- Password Setting --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Password Setting
              </h3>
            </div>
            <form onSubmit={handlePasswordSubmit}>
              <div className="p-6.5">
                <div>
                  <label className="mb-2.5 block text-black dark:text-white">
                    New Password
                  </label>
                  <input
                    type="password"
                    name='password'
                    value={newPassword.password}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <button type="submit" className="flex w-full justify-center mt-5 rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  {updatePasswordLoading ? 'Loading...' : 'Save Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Profile
