"use client";

import type { FC, ReactNode } from "react";
import clsx from "clsx";

import { usePathname } from "next/navigation";
import { Link } from "@AppComponents";

interface Props {
    href: string;
    className?: string;
    activeClass?: string;
    children: ReactNode
}

const NavLink: FC<Props> = ({
    activeClass = "text-red-500",
    className,
    children,
    href,
}) => {
    const pathname = usePathname();
    return (
        <Link
            className={clsx(
                "text-base text-light-600 flex flex-col items-center",
                className,
                pathname?.includes(href) && activeClass
            )}
            href={href}
        >
            {children}
        </Link>
    );
};

export default NavLink;
