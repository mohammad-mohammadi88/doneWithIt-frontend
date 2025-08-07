"use client";

import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/16/solid";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import Image from "next/image";
import clsx from "clsx";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    images: string[];
}

function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

const ViewImageModal: FC<Props> = ({ isOpen, onClose, images }) => {
    const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(
        null
    );
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const scrollToIndex = (index: number) => {
        if (!containerRef) return;
        const width = containerRef.clientWidth;
        containerRef.scrollTo({
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

    const handleScrollRef = useRef<() => void>(null);

    useEffect(() => {
        const container = containerRef;
        if (!container) return;

        const handleScroll = () => {
            const scrollLeft = container.scrollLeft;
            const width = container.clientWidth;
            const index = Math.round(scrollLeft / width);
            setCurrentIndex(index);
        };

        handleScrollRef.current = debounce(handleScroll, 100);

        const scrollListener = () => handleScrollRef.current?.();

        container.addEventListener("scroll", scrollListener);
        return () => {
            container.removeEventListener("scroll", scrollListener);
        };
    }, [containerRef]);

    useEffect(() => {
        scrollToIndex(0);
    }, []);
    const chevronClasses =
        "pointer-events-auto rounded-full not-disabled:cursor-pointer bg-gray-500 h-12 w-12 text-white px-3 py-1 disabled:opacity-50";
    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                aria-label="view image modal"
                className="relative z-50 pt-15"
                onClose={() => {}}
            >
                <div className="fixed inset-0 bg-black bg-opacity-80 transition-opacity" />
                <div
                    className={clsx(
                        "z-1 hidden fixed px-5 w-screen h-12",
                        "md:flex justify-between top-1/2 -translate-y-1/2",
                        "lg:translate-0 lg:justify-center lg:top-auto lg:space-x-5 lg:bottom-10"
                    )}
                >
                    <button
                        onClick={handlePrev}
                        className={chevronClasses}
                        disabled={currentIndex === 0}
                        aria-label="prev image"
                    >
                        <ChevronLeftIcon />
                    </button>
                    <button
                        onClick={handleNext}
                        className={chevronClasses}
                        aria-label="next image"
                        disabled={currentIndex === images.length - 1}
                    >
                        <ChevronRightIcon />
                    </button>
                </div>
                <div className="fixed bottom-0 left-0 right-0 top-15 overflow-hidden">
                    <div className="flex h-full items-end justify-center text-center">
                        <TransitionChild
                            as={Fragment}
                            enter="transform transition ease-out duration-300"
                            enterFrom="translate-y-full"
                            enterTo="translate-y-0"
                            leave="transform transition ease-in duration-200"
                            leaveFrom="translate-y-0"
                            leaveTo="translate-y-full"
                        >
                            <DialogPanel className="w-full h-full bg-black overflow-hidden">
                                <div
                                    ref={(ref) => setContainerRef(ref)}
                                    className="flex overflow-x-scroll snap-x snap-mandatory scroll-container scrollbar-hide h-full"
                                    aria-label="image container"
                                >
                                    {images.map((url, i) => (
                                        <Image
                                            width={1000}
                                            height={1000}
                                            key={i}
                                            src={url}
                                            alt={`image-${i}`}
                                            className="snap-start w-full object-contain h-full flex-shrink-0"
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={() => {
                                        onClose();
                                        scrollToIndex(0);
                                    }}
                                    className="absolute cursor-pointer z-20 top-4 right-4 text-white text-2xl"
                                    aria-label="close view image modals"
                                >
                                    ✕
                                </button>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ViewImageModal;
