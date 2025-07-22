"use client";

import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/16/solid";
import { FC, Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    images: string[];
}

const ViewImageModal: FC<Props> = ({ isOpen, onClose, images }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const scrollToIndex = (index: number) => {
        if (!containerRef.current) return;
        const width = containerRef.current.clientWidth;
        containerRef.current.scrollTo({
            left: width * index,
            behavior: "smooth",
        });
        setCurrentIndex(index);
    };

    const handleNext = () => {
        if (currentIndex < images.length - 1) {
            scrollToIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            scrollToIndex(currentIndex - 1);
        }
    };

    const chevronClasses =
        "pointer-events-auto rounded-full not-disabled:cursor-pointer bg-gray-500 h-12 w-12 text-white px-3 py-1 disabled:opacity-50";
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-50' onClose={() => {}}>
                <div className='fixed inset-0 bg-black bg-opacity-80 transition-opacity' />
                <div className='z-1 hidden md:flex fixed items-center px-5 top-1/2 -translate-y-1/2 w-screen h-12 justify-between'>
                    <button
                        onClick={handlePrev}
                        className={chevronClasses}
                        disabled={currentIndex === 0}
                    >
                        <ChevronLeftIcon />
                    </button>
                    <button
                        onClick={handleNext}
                        className={chevronClasses}
                        disabled={currentIndex === images.length - 1}
                    >
                        <ChevronRightIcon />
                    </button>
                </div>
                <div className='fixed inset-0 overflow-hidden'>
                    <div className='flex h-full items-end justify-center text-center'>
                        <Transition.Child
                            as={Fragment}
                            enter='transform transition ease-out duration-300'
                            enterFrom='translate-y-full'
                            enterTo='translate-y-0'
                            leave='transform transition ease-in duration-200'
                            leaveFrom='translate-y-0'
                            leaveTo='translate-y-full'
                        >
                            <Dialog.Panel className='w-full h-full bg-black overflow-hidden'>
                                <div
                                    ref={containerRef}
                                    className='flex overflow-x-scroll snap-x snap-mandatory scroll-container scrollbar-hide h-full'
                                >
                                    {images.map((url, i) => (
                                        <Image
                                            width={1000}
                                            height={1000}
                                            key={i}
                                            src={url}
                                            alt={`image-${i}`}
                                            className='snap-start w-full object-contain h-full flex-shrink-0'
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={() => {
                                        onClose();
                                        scrollToIndex(0);
                                    }}
                                    className='absolute cursor-pointer z-20 top-4 right-4 text-white text-2xl'
                                >
                                    ✕
                                </button>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default ViewImageModal;
