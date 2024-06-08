import React from 'react'
import { NavLink } from 'react-router-dom'
import { useProfile } from '../../hooks/useProfile'

const Unauthorized: React.FC = () => {
    const { profile } = useProfile()

    return (
        <div className='flex flex-col justify-center items-center gap-2 h-screen'>
            <h1 className='font-bold text-2xl text-black'>401 Unauthorized</h1>
            <p>You do not have permission to view this page.</p>
            <NavLink to={profile?.is_admin === 1 ? '/dashboard' : '/loaning'} className='mt-5 px-3 py-1.5 bg-primary rounded-lg text-white'>
                Back to {profile?.is_admin === 1 ? 'Dashboard' : 'Loaning'}
            </NavLink>
        </div>
    )
}

export default Unauthorized