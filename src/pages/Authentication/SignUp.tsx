import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LogoDark from "../../assets/img/logoHitam.png"
import { TbLock, TbMail } from 'react-icons/tb'
import Axios from '../../api/axios'
import { ToastContainer, toast } from 'react-toastify'

const SignIn: React.FC = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name || !email || !password) {
      setError('All fields are required')
      toast.error('All fields are required')
      return
    }

    try {
      await Axios.post('/register', { nama: name, email, password })
      toast.success('Register success, please login')
      
      setTimeout(() => {
        navigate('/sign-in');
      }, 2000); // Delay for 3 seconds
      return Promise.resolve()
    } catch (err) {
      setError('Registration failed')
      toast.error('Registration failed')
      return Promise.reject(err)
    }
  }

  return (
    <>
      <ToastContainer
        theme="colored"
        autoClose={1500}
        hideProgressBar
        closeButton={false}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />

      <div className="flex flex-wrap items-center h-screen">
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="py-26 px-26 text-center">
            <Link className="mb-5.5 inline-block" to="/">
              <img src={LogoDark} className='rounded-xl' alt="NDP Logo" />
            </Link>

            <p className="2xl:px-20"></p>

            <span className="mt-15 inline-block"></span>
          </div>
        </div>

        <div className="w-full xl:w-1/2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <span className="mb-1.5 block font-medium">Welcome!</span>
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Sign Up to IMS - Infinite Learning
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                  />
                  <span className="absolute right-4 top-4">
                    <TbMail size={22} className='text-zinc-400' />
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                  />
                  <span className="absolute right-4 top-4">
                    <TbMail size={22} className='text-zinc-400' />
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                  />
                  <span className="absolute right-4 top-4">
                    <TbLock size={22} className='text-zinc-400' />
                  </span>
                </div>
              </div>

              {error && (
                <div className="mb-4 text-red-500">
                  {error}
                </div>
              )}

              <div className="mb-5">
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                >
                  Sign Up
                </button>
              </div>

              <div className="mt-6 text-center">
                <p>
                  Already have an account?{' '}
                  <Link to="/sign-in" className="text-primary">
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn
