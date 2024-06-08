import React from 'react'
import { Field, Label, Textarea } from '@headlessui/react'
import clsx from 'clsx'

interface ITextareaProps {
    name?: string
    label?: string
    value?: string
    rows?: number
    cols?: number
    disabled?: boolean
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const FormTextarea: React.FC<ITextareaProps> = ({
    name,
    label,
    value,
    rows = 3,
    cols,
    disabled,
    onChange,
}) => {
    return (
        <Field>
            {label && (
                <Label className="text-sm/6 font-medium text-black dark:text-white">{label}</Label>
            )}
            <Textarea
                name={name}
                value={value}
                onChange={onChange}
                className={clsx(
                    'block w-full rounded-lg border border-black/25 bg-white dark:bg-graydark dark:text-white py-2.5 px-3 text-sm text-black dark:border-slate-400',
                    'focus:border-transparent focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25 dark:data-[focus]:outline-white'
                )}
                rows={rows}
                cols={cols}
                disabled={disabled}
            />
        </Field>
    )
}

export default FormTextarea
