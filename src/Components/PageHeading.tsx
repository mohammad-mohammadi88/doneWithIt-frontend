"use client";

import { type FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { hasInternalBack } from "@/utilities";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

interface Props {
    title: string;
}

const PageHeading: FC<Props> = ({ title }) => {
    const router = useRouter();
    const [canGoBack, setCanGoBack] = useState(false);

    useEffect(() => {
        setCanGoBack(hasInternalBack());
    }, []);

    return (
        <div className='flex fixed top-0 w-screen shadow-lg items-center gap-2 p-4 z-90 '>
            {canGoBack && (
                <button
                    onClick={() => router.back()}
                    className='pr-2 cursor-pointer font-medium'
                >
                    <ArrowLeftIcon className="w-6 h-6 hover:text-blue-600 text-gray-700"/>
                </button>
            )}
            <h1 className='text-lg font-bold'>{title}</h1>
        </div>
    );
};

export default PageHeading;
