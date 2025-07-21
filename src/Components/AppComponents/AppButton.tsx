import { Button, ButtonProps } from "@headlessui/react";
import type { FC } from "react";
import clsx from "clsx";

const AppButton: FC<ButtonProps> = ({ children, className, ...props }) => (
    <Button
        className={clsx(
            "flex-1 h-12 py-2 rounded-full flex cursor-pointer justify-center text-white items-center text-2xl",
            "data-hover:brightness-90 duration-200",
            className,
        )}
        {...props}
    >
        {children}
    </Button>
);

export default AppButton;
