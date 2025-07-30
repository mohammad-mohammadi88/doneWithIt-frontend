"use client";

import type { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import { mdiChevronRight } from "@mdi/js";
import Image from "next/image";
import Icon from "@mdi/react";
import clsx from "clsx";

import { Link } from "../AppComponents";

interface Props
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    image?: string;
    title: string;
    subTitle?: string;
    chevron?:boolean;
    ImageReplaceComponent?: () => React.JSX.Element;
}

const Component: FC<Props> = ({
    chevron = true,
    className,
    image,
    ImageReplaceComponent,
    subTitle,
    title,
    ...props
}) => (
    <button
        className={clsx("flex w-full items-center bg-white", className)}
        {...props}
    >
        {ImageReplaceComponent && <ImageReplaceComponent />}
        {image && (
            <Image
                src={image}
                alt={title + " image"}
                height={500}
                width={500}
                className='h-17 w-17 rounded-[35px]'
            />
        )}
        <div className='ml-2.5 h-17.5 flex-1 flex items-start justify-center truncate flex-col'>
            <h3
                className='truncate  text-lg font-semibold capitalize'
                title={title}
            >
                {title}
            </h3>
            {subTitle && (
                <h4
                    className='text-lg text-light-600 mt-1.25 truncate'
                    title={subTitle}
                >
                    {subTitle}
                </h4>
            )}
        </div>
        {chevron && (
            <Icon path={mdiChevronRight} className='text-light-600' size={1} />
        )}
    </button>
);

const ListItem: FC<Props & { href?: string }> = ({ href, ...props }) =>
    href ? (
        <Link href={href}>
            <Component {...props} />
        </Link>
    ) : (
        <Component {...props} />
    );

export default ListItem;
