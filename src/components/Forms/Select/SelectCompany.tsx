import React from 'react'
import { TbChevronDown } from 'react-icons/tb'
import { ISelectItemProps } from './Select'

interface SelectCompanyProps {
  selectedOption?: any
  items: ISelectItemProps[]
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const SelectCompany: React.FC<SelectCompanyProps> = ({ selectedOption, items, onChange }) => {
  return (
    <div className="mb-5">
      <label className="mb-2.5 block text-black dark:text-white">
        Company
      </label>

      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <select
          name='perusahaan'
          value={selectedOption}
          onChange={onChange}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${selectedOption ? 'text-black dark:text-white' : ''}`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            Select company
          </option>
          {items.map((item, idx) => (
            <option key={idx} value={item.value}>{item.text}</option>
          ))}
        </select>

        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
          <TbChevronDown size={21} />
        </span>
      </div>
    </div>
  )
}

export default SelectCompany
