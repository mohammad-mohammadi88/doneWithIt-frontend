"use client";
import { useEffect, type FC } from "react";
import Lottie from "lottie-react";

import doneAnimationJson from "@/animations/done.json";

interface Props {
    visible: boolean;
    onAnimationEnd: () => void;
}

const DoneAnimation: FC<Props> = ({ onAnimationEnd, visible }) => {
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => onAnimationEnd(), 1000);
            return () => clearTimeout(timer);
        }
    }, [visible, onAnimationEnd]);
    return (
        <Lottie
            autoPlay
            loop={false}
            animationData={doneAnimationJson}
            className="h-32 w-32 mx-auto md:h-50 md:w-50"
        />
    );
};

export default DoneAnimation;
