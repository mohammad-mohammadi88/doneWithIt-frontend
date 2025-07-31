import { ErrorMessage } from "formik";
import type { FC } from "react";
import { Field } from "formik";
import clsx from "clsx";

interface Props{
    inputType?: string;
    autoFocus?:boolean;
    label: string;
    name: string;
    className?: string;
    readonly value: string;
    onChange: (...args: any) => void;
}
const Input: FC<Props> = ({
    name,
    className,
    inputType = "text",
    label,
    ...attrs
}) => (
    <div className='relative'>
        <Field
            type={inputType}
            name={name}
            id={name}
            placeholder=' '
            className={clsx(
                "outline-1 outline-gray-100 border-0 -outline-offset-3",
                "focus:outline-indigo-600 focus:bg-white focus:outline-2 focus:-outline-offset-2",
                "text-base text-gray-900 placeholder:text-gray-400 sm:text-sm/6",
                "mt-2 block w-full rounded-full bg-white placeholder-shown:bg-light-200 px-3 py-1.5 border-2 peer",
                className
            )}
            {...attrs}
        />
        <label
            htmlFor={name}
            className={clsx(
                "block absolute duration-200 bg-white cursor-text -top-1 left-3.5 text-sm/6 font-medium text-gray-900",
                "peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:bg-light-200",
                "peer-focus:-top-1 peer-focus:text-sm/6 peer-focus:text-gray-900 peer-focus:bg-white"
            )}
        >
            {label}
        </label>

        <ErrorMessage
            name={name}
            component='div'
            className='text-red-600 text-base'
        />
    </div>
);

export default Input;
