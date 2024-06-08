import React from 'react';
import { TbChevronDown } from 'react-icons/tb';

interface SelectCompanyProps {
  selectedOption: string;
  onChange: (value: string) => void;
}

const SelectCompany: React.FC<SelectCompanyProps> = ({ selectedOption, onChange }) => {
  return (
    <div className="mb-5">
      <label className="mb-2.5 block text-black dark:text-white">
        Company
      </label>

      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <select
          value={selectedOption}
          onChange={(e) => onChange(e.target.value)}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${selectedOption ? 'text-black dark:text-white' : ''}`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            Select company
          </option>
          <option value="Infinite Learning Indonesia" className="text-body dark:text-bodydark">
            Infinite Learning Indonesia
          </option>
          <option value="Nongsa Digital Park" className="text-body dark:text-bodydark">
            Nongsa Digital Park
          </option>
        </select>

        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
          <TbChevronDown size={21} />
        </span>
      </div>
    </div>
  )
}

export default SelectCompany
