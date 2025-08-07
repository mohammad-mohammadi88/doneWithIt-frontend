"use client";

import type { FC } from "react";

import { Modal } from "@AppComponents";
import { DoneAnimation } from ".";

interface Props {
    modalShow: boolean;
    onAnimationEnd: () => void;
}

const DoneModal: FC<Props> = ({ modalShow, onAnimationEnd }) => (
    <Modal isOpen={modalShow} onClose={onAnimationEnd}>
        <DoneAnimation visible={modalShow} onAnimationEnd={onAnimationEnd} />
    </Modal>
);

export default DoneModal;
