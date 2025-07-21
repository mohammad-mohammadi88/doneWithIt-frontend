"use client";

import { usePathname } from "next/navigation";
import { FC, useEffect, useRef } from "react";
import NProgress from "nprogress";
import "@/NProgress.css";

const NavigationProgress: FC = () => {
    const pathname = usePathname();
    const isFirstRender = useRef<boolean>(true);

    useEffect(() => {
        !isFirstRender.current
            ? NProgress.start()
            : (isFirstRender.current = false);

        return () => {
            NProgress.done();
            isFirstRender.current = true
        };
    }, [pathname]);

    return null;
};

export default NavigationProgress;
