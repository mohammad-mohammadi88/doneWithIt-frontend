"use client";
import { Fragment, useEffect, type FC } from "react";
import { Transition } from "@headlessui/react";
import Lottie from "lottie-react";

import doneAnimation from "@/animations/done.json";

interface Props {
    modalShow: boolean;
    onAnimationEnd: () => void;
}

const DoneModal: FC<Props> = ({ modalShow, onAnimationEnd }) => {
    useEffect(() => {
        if (modalShow) {
            const timer = setTimeout(() => onAnimationEnd(), 1000);
            return () => clearTimeout(timer);
        }
    }, [modalShow]);

    return (
        <Transition.Root
            show={modalShow}
            as='div'
            className={
                "fixed z-1002 top-0 left-0 bottom-0 right-0 overflow-hidden"
            }
        >
            <Transition.Child
                as={Fragment}
                enter='transform transition ease-out duration-300'
                enterFrom='translate-y-full opacity-0'
                enterTo='translate-y-0 opacity-100'
                leave='transform transition ease-in duration-200'
                leaveFrom='translate-y-0 opacity-100'
                leaveTo='translate-y-full opacity-0'
            >
                <div className='w-screen h-screen  flex justify-center items-center rounded-t-xl bg-white px-4 py-6 '>
                    <Lottie
                        autoPlay
                        loop={false}
                        animationData={doneAnimation}
                        className='h-32 w-32 mx-auto md:h-50 md:w-50'
                    />
                </div>
            </Transition.Child>
        </Transition.Root>
    );
};

export default DoneModal;
