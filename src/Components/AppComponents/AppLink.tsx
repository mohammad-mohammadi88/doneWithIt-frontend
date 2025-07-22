"use client"
import type { FC, MouseEvent, ReactNode } from "react";
import Link from "next/link";

import { Button } from ".";
import NProgress from "nprogress";
import { useRouter } from "next/navigation";

interface Props {
    href: string;
    className?: string;
    children: ReactNode;
}

const AppLink: FC<Props> = ({ children, href, className }) => {
    const router = useRouter();
    const handleLink = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        NProgress.start();
        router.push(href);
    };
    return (
        <Button className={className}>
            <Link className='w-full' onClick={handleLink} href={href}>
                {children}
            </Link>
        </Button>
    );
};

export default AppLink;
