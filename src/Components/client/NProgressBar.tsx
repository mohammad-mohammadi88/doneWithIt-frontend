"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";

const NavigationProgress = () => {
    const pathname = usePathname();
    const isFirstRender = useRef(true);

    useEffect(() => {
        const handlePopState = () => {
            NProgress.start();
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
        } else {
            NProgress.start();
        }

        NProgress.done();
    }, [pathname]);

    return null;
};

export default NavigationProgress;
