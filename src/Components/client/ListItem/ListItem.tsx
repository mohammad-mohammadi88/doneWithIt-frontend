"use client";

import { Button } from "@headlessui/react";
import { mdiChevronRight } from "@mdi/js";
import Image from "next/image";
import Icon from "@mdi/react";
import clsx from "clsx";
import {
    memo,
    type FC,
} from "react";

import { Link, LongPressButton } from "@AppComponents";
import type { ListItemProps } from "@/types/globals";


const Component: FC<ListItemProps> = ({
    chevron = true,
    className,
    image,
    ImageReplaceComponent,
    subTitle,
    title,
    priority,
    ...props
}) => {
    const ButtonComponent = props.onLongPress ? LongPressButton : Button as any;
    return (
        <ButtonComponent
            className={clsx(
                "flex w-full items-center bg-white",
                chevron && "cursor-pointer",
                className
            )}
            {...props}
        >
            {ImageReplaceComponent && ImageReplaceComponent}
            {image && (
                <Image
                    src={image}
                    alt={title + " image"}
                    priority={priority}
                    height={500}
                    width={500}
                    className='h-17 w-17 rounded-[35px]'
                />
            )}
            <div className='ml-2.5 h-17.5 flex-1 flex items-start justify-center truncate flex-col'>
                <h3
                    className='truncate text-lg font-semibold capitalize'
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
                <Icon
                    path={mdiChevronRight}
                    className='text-light-600'
                    size={1}
                />
            )}
        </ButtonComponent>
    );
};

const ListItem: FC<ListItemProps & { href?: string }> = ({ href, ...props }) =>
    href ? (
        <Link href={href}>
            <Component {...props} />
        </Link>
    ) : (
        <Component {...props} />
    );

export default memo(ListItem);
