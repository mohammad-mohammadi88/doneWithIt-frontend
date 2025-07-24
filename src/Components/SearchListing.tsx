"use client";
import { useEffect, useState, type FC } from "react";

import { Input } from "./AppComponents";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const SearchListing: FC = () => {
    const [searchedValue, setSearchedValue] = useState("");
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // debounce state
    const [debouncedValue, setDebouncedValue] = useState(searchedValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(searchedValue);
        }, 500);

        return () => clearTimeout(handler);
    }, [searchedValue]);

    useEffect(() => {
        const newSearchParams = new URLSearchParams(searchParams?.toString());
        newSearchParams.set("q", debouncedValue);
        router.replace(`${pathname}?${newSearchParams.toString()}`);
    }, [debouncedValue]);

    return (
        <div>
            <Input
                id='search'
                icon={<MagnifyingGlassIcon width={20} />}
                value={searchedValue}
                setValue={setSearchedValue}
            />
        </div>
    );
};

export default SearchListing;
