import React, { useState } from 'react'
import { TTableHeader } from '../../types/table'
import FormInput from '../Forms/Input/Input'
import Badge from '../Badge/Badge'
import { TbCheckbox, TbEdit, TbHistory, TbSearch, TbTrash } from 'react-icons/tb'

interface ITableProps {
  headers: TTableHeader[]
  data: any[]
  createButton?: React.ReactNode
  onEdit?: (item: any) => void
  onEditLoan?: (item: any) => void
  onDeleteInventory?: (id: number) => void
  onDeleteUser?: (id: number) => void
  onProcessApproval?: (id: number) => void
  onReturnLoan?: (id: number) => void
  statusMapping?: { [key: number]: string }
}

const Table: React.FC<ITableProps> = ({
  headers,
  data,
  createButton,
  onEdit,
  onEditLoan,
  onDeleteInventory,
  onDeleteUser,
  onProcessApproval,
  onReturnLoan,
  statusMapping,
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
    setCurrentPage(1) // Reset to first page when search query changes
  }

  const filteredData = data.filter((row) =>
    headers.some((header) =>
      row[header.value].toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value))
    setCurrentPage(1) // Reset to first page when items per page change
  }

  const renderCellContent = (header: TTableHeader, value: any) => {
    if ((header.value === 'status' || header.value === 'is_admin') && statusMapping) {
      const statusText = statusMapping[value] || value
      return <Badge text={statusText} type={statusText} />
    }
    return value
  }

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="text-sm border border-black/25 rounded-md px-3 py-1.5 focus:outline-none text-black dark:bg-graydark dark:border-graydark dark:text-white"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>

        <div className="flex w-full items-center gap-2">
          <div className="w-full max-w-70 ml-auto">
            <FormInput
              type='text'
              placeholder='Search'
              value={searchQuery}
              prefixIcon={
                <TbSearch className='text-slate-400' />
              }
              onChange={handleSearchChange}
            />
          </div>

          {createButton}
        </div>
      </div>

      <div className="relative overflow-x-auto border border-[#e5e7eb] dark:border-graydark sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-black">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-graydark dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-4">
                No
              </th>

              {headers.map((header, idx) => (
                <th key={idx} scope="col" className="px-6 py-4">
                  {header.text}
                </th>
              ))}

              <th scope="col" className="px-6 py-4">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {currentData.length > 0 ? (
              currentData.map((row, idx) => (
                <tr key={idx} className="bg-white border-b border-gray dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4 whitespace-nowrap">{indexOfFirstItem + idx + 1}</td>

                  {headers.map((header) => (
                    <td key={header.text} className="px-6 py-4 whitespace-nowrap">
                      {renderCellContent(header, row[header.value])}
                    </td>
                  ))}

                  <td className="px-6 py-4 flex gap-4 whitespace-nowrap">
                    {onProcessApproval && row?.status === 0 && (
                      <button
                        className="font-medium text-green-600 dark:text-green-500 hover:underline"
                        onClick={() => onProcessApproval(row?.id_peminjaman)}
                      >
                        <TbCheckbox size={20} />
                      </button>
                    )}

                    {onReturnLoan && row?.status === 1 && (
                      <button
                        className="flex items-center gap-1 px-2 py-1.5 rounded-md font-medium text-blue-600 dark:text-blue-500 hover:bg-blue-50 transition-colors duration-150"
                        onClick={() => onReturnLoan(row?.id_peminjaman)}
                      >
                        <TbHistory size={18} />
                        Return
                      </button>
                    )}

                    {onEdit && (
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => onEdit(row)}
                      >
                        <TbEdit size={20} />
                      </button>
                    )}
                    
                    {onEditLoan && row.status === 0 && (
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => onEditLoan(row)}
                      >
                        <TbEdit size={20} />
                      </button>
                    )}

                    {onDeleteInventory && (
                      <button
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        onClick={() => onDeleteInventory(row?.id_barang)}
                      >
                        <TbTrash size={20} />
                      </button>
                    )}

                    {onDeleteUser && (
                      <button
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        onClick={() => onDeleteUser(row?.id_user)}
                      >
                        <TbTrash size={20} />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center">
                <td className='bg-white py-5' colSpan={headers.length + 2}>No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {currentData.length !== 0 && (
        <div className='flex items-center justify-end mt-3'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn-pagination mr-2"
          >
            Previous
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn-pagination ml-2"
          >
            Next
          </button>
        </div>
      )}
    </>
  )
}

export default Table
