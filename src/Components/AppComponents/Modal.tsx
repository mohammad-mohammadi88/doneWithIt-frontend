"use client";
import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import { Fragment, ReactNode, type FC } from "react";

interface Props {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

const Modal: FC<Props> = ({ children, isOpen, onClose }) => (
    <Transition show={isOpen} as={Fragment}>
        <TransitionChild
            as={Fragment}
            enter="transform transition ease-out duration-300"
            enterFrom="translate-y-full opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="transform transition ease-in duration-200"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="translate-y-full opacity-0"
        >
            <Dialog as="div" onClose={onClose} className="fixed inset-0 z-2000">
                {children}
            </Dialog>
        </TransitionChild>
    </Transition>
);

export default Modal;
