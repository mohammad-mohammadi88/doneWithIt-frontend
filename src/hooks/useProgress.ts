"use client";
import { Dispatch, SetStateAction, useState } from "react";

const useProgress = (
    progress: number,
    setProgress: Dispatch<SetStateAction<number>>
) => {
    const [timer, setTimer] = useState<NodeJS.Timeout>();
    const clearProgress = () => {
        clearInterval(timer);
        setTimer(undefined);
    };
    const startProgress = () => {
        setTimer(
            setInterval(() => {
                const randomUpload = Math.random() / 10;
                if (progress + randomUpload >= 0.95) {
                    setProgress(0.95);
                    return clearProgress();
                }
                setProgress((p) => p + randomUpload);
            }, 100)
        );
    };
    return {
        startProgress,
        clearProgress,
    };
};
export default useProgress;
