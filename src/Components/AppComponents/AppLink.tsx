import type { Url } from "next/dist/shared/lib/router/router";
import type { FC, ReactNode } from "react";
import Link from "next/link";

import { Button } from ".";

interface Props {
    href: Url;
    className?: string;
    children: ReactNode;
}

const AppLink: FC<Props> = ({ children, href, className }) => (
    <Button className={className}>
        <Link className='w-full' href={href}>
            {children}
        </Link>
    </Button>
);

export default AppLink;
