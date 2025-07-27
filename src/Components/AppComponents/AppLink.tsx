"use client";
import { usePathname, useRouter } from "next/navigation";
import type { FC, MouseEvent, ReactNode } from "react";
import NProgress from "nprogress";
import Link from "next/link";
import clsx from "clsx";

interface Props {
    href: string;
    className?: string;
    children: ReactNode;
}

const AppLink: FC<Props> = ({ children, href, className }) => {
    const router = useRouter();
    const pathname = usePathname()
    const handleLink = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if(pathname !== href){
            NProgress.start();
            router.push(href);
        }
    };
    return (
        <Link
            onDragStart={(e) => e.preventDefault()}
            className={clsx("w-full", className)}
            href={href}
            onClick={handleLink}
        >
            {children}
        </Link>
    );
};

export default AppLink;
