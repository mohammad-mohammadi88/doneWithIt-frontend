"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useEffect, useState, type FC } from "react";

import { queryReplacor } from "@/utilities";
import { Input } from "./AppComponents";

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
        queryReplacor({
            router,
            pathname,
            searchParams,
            queryName: "q",
        })(debouncedValue);
    }, [debouncedValue]);

    return (
        <div className='flex-1'>
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
