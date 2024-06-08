import React from 'react'
import CardDataStats from '../../components/CardDataStats'
import DefaultLayout from '../../layout/DefaultLayout'
import { TbBox, TbBoxOff, TbCalendarTime, TbCheckbox } from 'react-icons/tb'
import { useDashboard } from '../../hooks/useDashboard'

const Dashboard: React.FC = () => {
  const { totalInventory, totalReadyInventory, totalMaintenanceInventory, totalLateReturnLoan } = useDashboard()

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total Inventories" total={totalInventory}>
          <TbBox size={24} className='text-primary dark:text-white' />
        </CardDataStats>
        <CardDataStats title="Total Ready Inventory" total={totalReadyInventory}>
          <TbCheckbox size={24} className='text-primary dark:text-white' />
        </CardDataStats>
        <CardDataStats title="Total Maintenance Inventory" total={totalMaintenanceInventory}>
          <TbBoxOff size={24} className='text-primary dark:text-white' />
        </CardDataStats>
        <CardDataStats title="Total Late Return Loan" total={totalLateReturnLoan}>
          <TbCalendarTime size={24} className='text-primary dark:text-white' />
        </CardDataStats>
      </div>
    </DefaultLayout>
  )
}

export default Dashboard
