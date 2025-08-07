"use client";

import type { FC } from "react";

import { Modal } from "@AppComponents";
import Progress from "./Progress";
import { DoneAnimation } from ".";

interface Props {
    visible: boolean;
    onAnimationEnd: () => void;
    progress: number;
}

const ProgressModal: FC<Props> = ({ visible, onAnimationEnd, progress }) => (
    <Modal isOpen={visible} onClose={onAnimationEnd}>
        <div className="w-screen h-screen flex justify-center items-center bg-white px-4 py-6">
            {progress < 1 ? (
                <Progress progress={progress} />
            ) : (
                <DoneAnimation visible onAnimationEnd={onAnimationEnd} />
            )}
        </div>
    </Modal>
);

export default ProgressModal;
