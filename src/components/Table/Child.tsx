import React from 'react'

interface ChildProps {
  children: React.ReactNode
}

const TableData: React.FC<ChildProps> = ({ children }) => {
  return <div>{children}</div>
}

export default TableData
