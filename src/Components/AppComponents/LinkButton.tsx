import type { FC, ReactNode } from "react";

import { Button, Link } from ".";

interface Props {
    children: ReactNode;
    className?: string;
    linkClassName?: string;
    href: string;
}

const LinkButton: FC<Props> = ({
    children,
    className,
    href,
    linkClassName,
}) => (
    <Button className={className}>
        <Link className={linkClassName} href={href}>
            {children}
        </Link>
    </Button>
);

export default LinkButton;
