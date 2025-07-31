"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import type { FC } from "react";
import clsx from "clsx";
import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
} from "@headlessui/react";

import type { ServerCategories } from "@/types/categories";
import { queryReplacor } from "@/utilities";
import { CategoryIcon } from ".";

interface Props {
    categories: ServerCategories[];
    selected: string;
}
const SearchByCategory: FC<Props> = ({ categories, selected = "All" }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const options: ServerCategories[] = [
        {
            backgroundColor: "red",
            color: "white",
            icon: "apps",
            id: 152,
            name: "All",
        },
        ...categories,
    ];
    const selectedIcon =
        options.find(({ name }) => name === selected)?.icon || "apps";
    return (
        <div className='mx-auto w-full sm:w-52'>
            <Listbox
                value={selected || "All"}
                onChange={queryReplacor({
                    router,
                    pathname,
                    searchParams,
                    queryName: "category",
                })}
            >
                <ListboxButton
                    className={clsx(
                        "relative flex items-center h-11 w-full rounded-lg bg-gray-500 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white",
                        "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/15"
                    )}
                >
                    <div className='pr-2'>
                        <CategoryIcon
                            color='white'
                            icon={selectedIcon}
                            size={1}
                        />
                    </div>
                    {selected || "All"}
                    <ChevronDownIcon
                        className='group pointer-events-none absolute top-3 right-2.5 size-5 fill-light-100'
                        aria-hidden='true'
                    />
                </ListboxButton>
                <ListboxOptions
                    anchor='bottom'
                    transition
                    className={clsx(
                        "w-(--button-width) rounded-lg border border-white/5 bg-gray-500 p-1 [--anchor-gap:--spacing(1)] focus:outline-none",
                        "transition duration-100 ease-in data-leave:data-closed:opacity-0"
                    )}
                >
                    {options.map(({ name, icon }) => (
                        <ListboxOption
                            key={name}
                            value={name}
                            className='group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10'
                        >
                            <CheckIcon className='invisible size-4 fill-white group-data-selected:visible' />
                            <CategoryIcon color='white' icon={icon} size={1} />
                            <div className='text-sm/6 text-white'>{name}</div>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Listbox>
        </div>
    );
};

export default SearchByCategory;
