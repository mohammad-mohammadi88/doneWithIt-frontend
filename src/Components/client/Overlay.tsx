"use client";
import type { FC, ReactNode } from "react";

interface Props {
    children?: ReactNode;
    visible: boolean;
}

const Overlay: FC<Props> = ({ children, visible = false }) =>
    visible && (
        <div className='absolute flex justify-center items-center bg-white/80 h-screen opacity-80 top-0 left-0 right-0 bottom-0 z-10'>
            {children}
        </div>
    );

export default Overlay;
