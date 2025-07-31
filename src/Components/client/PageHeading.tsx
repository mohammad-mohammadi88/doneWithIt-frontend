"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { type FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

import { hasInternalBack } from "@/utilities";

interface Props {
    title: string;
    className?: string;
}

const PageHeading: FC<Props> = ({ title, className }) => {
    const router = useRouter();
    const [canGoBack, setCanGoBack] = useState(false);

    useEffect(() => {
        setCanGoBack(hasInternalBack());
    }, []);

    return (
        <div
            className={clsx(
                "flex page-heading w-screen shadow-lg bg-white items-center",
                "fixed h-15 gap-2 p-4 z-90 top-0",
                className
            )}
        >
            {canGoBack && (
                <button
                    onClick={() => router.back()}
                    className='pr-2 cursor-pointer font-medium'
                >
                    <ArrowLeftIcon className='w-6 h-6 hover:text-blue-600 text-gray-700' />
                </button>
            )}
            <h1 className='text-lg font-bold'>{title}</h1>
        </div>
    );
};

export default PageHeading;
