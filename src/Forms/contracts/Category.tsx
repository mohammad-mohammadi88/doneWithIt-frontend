"use client";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useEffect, useState, type FC } from "react";
import { ErrorMessage } from "formik";
import clsx from "clsx";

import type { ServerCategories } from "@/types/categories";
import serverCategories from "@/APIs/server/categories";
import { CategoryIcon } from "@Client";
import { Modal } from "@AppComponents";
import { DialogPanel } from "@headlessui/react";

interface Props {
    value?: number;
    handleChange: (value: number) => void;
}

const Category: FC<Props> = ({ handleChange, value }) => {
    const [categories, setCategories] = useState<ServerCategories[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(false);

    useEffect(() => {
        serverCategories.getCategories().then(setCategories);
    }, []);

    const selected = categories.find(({ id }) => id === value);

    const handleCloseModal = () => setOpenModal(false);

    return (
        <div>
            <button
                onClick={() => setOpenModal(true)}
                className={clsx(
                    "border-2 cursor-pointer bg-light-300 px-2 py-1.5 rounded-full",
                    "w-7/10 sm:w-6/10 flex justify-between items-center"
                )}
            >
                <div className="flex items-center">
                    <CategoryIcon
                        icon={selected?.icon || "apps"}
                        color="gray"
                    />
                    <h3
                        className={clsx(
                            selected?.name ? "text-black" : "text-gray-600",
                            "px-2 text-lg"
                        )}
                    >
                        {selected?.name ?? "Category"}
                    </h3>
                </div>
                <ChevronDownIcon className="h-6 w-6" />
            </button>
            <ErrorMessage
                name="category"
                component="div"
                className="text-red-600 text-base"
            />
            <Modal isOpen={openModal} onClose={handleCloseModal}>
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 sm:p-4">
                    <div className="h-full w-full relative">
                        <DialogPanel
                            className={clsx(
                                "bottom-0 top-0 bg-white absolute w-screen p-6",
                                "sm:top-1/2 sm:left-1/2 s sm:bottom-auto sm:-translate-1/2 sm:rounded-xl sm:w-md"
                            )}
                        >
                            <button
                                className="absolute top-3 left-3 cursor-pointer text-xl"
                                onClick={handleCloseModal}
                            >
                                ✕
                            </button>
                            <div className="flex items-center justify-center">
                                <div className="flex flex-wrap">
                                    {categories.map(
                                        ({
                                            id,
                                            backgroundColor,
                                            icon,
                                            name,
                                        }) => (
                                            <button
                                                className="flex w-1/3 cursor-pointer flex-col p-2 items-center"
                                                key={id}
                                                onClick={() => {
                                                    handleChange(id);
                                                    setOpenModal(false);
                                                }}
                                            >
                                                <div
                                                    className="rounded-full p-3"
                                                    style={{ backgroundColor }}
                                                >
                                                    <CategoryIcon
                                                        size={1.5}
                                                        icon={icon}
                                                        color="white"
                                                    />
                                                </div>
                                                <h5 className="pt-1">{name}</h5>
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Category;
