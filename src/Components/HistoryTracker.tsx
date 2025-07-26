"use client";

import { usePathname } from "next/navigation";
import { type FC, useEffect } from "react";

const HistoryTracker:FC = () =>  {
    const pathname = usePathname();

    useEffect(() => {
        const historyStack = JSON.parse(
            sessionStorage.getItem("history") || "[]"
        );

        if (historyStack[historyStack.length - 1] !== pathname) {
            historyStack.push(pathname);
            sessionStorage.setItem("history", JSON.stringify(historyStack));
        }
    }, [pathname]);

    return null;
}

export default HistoryTracker