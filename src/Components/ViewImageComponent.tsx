"use client";

import { useState, type FC, type ReactNode } from "react";
import { ViewImageModal } from ".";
import clsx from "clsx";

interface Props {
    children: ReactNode;
    className?: string;
    images: string[];
}

const ViewImageComponent: FC<Props> = ({ children, className, images }) => {
    const [modalShow, setModalShow] = useState<boolean>(false);
    return (
        <>
            <button
                className={clsx("w-full", className)}
                onClick={() => setModalShow(true)}
            >
                {children}
            </button>
            <ViewImageModal
                isOpen={modalShow}
                onClose={() => setModalShow(false)}
                images={images}
            />
        </>
    );
};

export default ViewImageComponent;
