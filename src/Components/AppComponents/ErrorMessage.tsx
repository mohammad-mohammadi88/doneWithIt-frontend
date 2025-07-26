import type { FC } from "react";
import clsx from "clsx";

interface Props {
    title: string;
    className?: string;
}

const ErrorMessage: FC<Props> = ({ className, title }) => (
    <h2
        className={clsx(
            "text-secondary text-2xl text-center px-3",
            className
        )}
    >
        {title}
    </h2>
);

export default ErrorMessage;
