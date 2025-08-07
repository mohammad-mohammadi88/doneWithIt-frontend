"use client";

import {
    Description,
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import { FC, Fragment } from "react";
import { Modal } from "../AppComponents";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
}

const ConfirmDialog: FC<Props> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
}) => (
    <Modal isOpen={isOpen} onClose={onClose}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm">
                <DialogTitle className="text-lg font-semibold">
                    {title}
                </DialogTitle>
                <Description className="mt-2 text-sm text-gray-600">
                    {description}
                </Description>

                <div className="mt-4 flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
                    >
                        OK
                    </button>
                </div>
            </DialogPanel>
        </div>
    </Modal>
);

export default ConfirmDialog;
