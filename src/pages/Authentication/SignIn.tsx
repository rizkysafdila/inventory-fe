import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LogoDark from "../../assets/img/logoHitam.png"
import { TbLock, TbMail } from 'react-icons/tb'
import Axios from '../../api/axios'
import { useProfile } from '../../hooks/useProfile'
import { ToastContainer, toast } from 'react-toastify'

const SignIn: React.FC = () => {
  const navigate = useNavigate()
  const { profile } = useProfile()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Email and password are required.')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }

    setError('')

    try {
      await Axios.post('/login', { email, password })
      toast.success('Register success, please login')

      setTimeout(() => {
        navigate('/dashboard')
      }, 2000); // Delay for 3 seconds
      return Promise.resolve()
    } catch (err) {
      setError('Login failed. Please check your email and password.')
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
            <p className="2xl:px-20">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
              suspendisse.
            </p>
          </div>
        </div>

        <div className="w-full xl:w-1/2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <span className="mb-1.5 block font-medium">Welcome back!</span>
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Sign In to IMS - Infinite Learning
            </h2>

            <form onSubmit={handleSubmit}>
              {error && <div className="mb-4 text-red-600">{error}</div>}

              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  <span className="absolute right-4 top-4">
                    <TbLock size={22} className='text-zinc-400' />
                  </span>
                </div>
              </div>

              <div className="mb-5">
                <input
                  type="submit"
                  value="Sign In"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                />
              </div>

              <div className="mt-6 text-center">
                <p>
                  Don’t have any account?{' '}
                  <Link to="/sign-up" className="text-primary">
                    Sign Up
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
