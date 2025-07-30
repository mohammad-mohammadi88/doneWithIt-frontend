import { XMarkIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import type {
    DetailedHTMLProps,
    FC,
    InputHTMLAttributes,
    ReactNode,
} from "react";

interface Props
    extends DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    value: string;
    id: string;
    setValue: (text: string) => void;
    icon?: ReactNode;
}

const AppInput: FC<Props> = ({
    className,
    icon,
    id,
    setValue,
    value,
    ...props
}) => (
    <div className='relative w-full cursor-pointer'>
        <label
            className='absolute left-2 top-1/2 -translate-y-1/2'
            htmlFor={id}
        >
            {icon}
        </label>
        <input
            id={id}
            className={clsx(
                "w-full bg-light-300 pr-9 shadow-lg rounded-full text-black p-2",
                icon && "pl-10",
                className
            )}
            value={value}
            onInput={(e: any) => setValue(e.target.value)}
            {...props}
        />
        <XMarkIcon
            aria-label='xIconForCleanUp'
            className='w-6 h-6 absolute right-2  top-1/2 -translate-y-1/2'
            onClick={() => setValue("")}
        />
    </div>
);

export default AppInput;
