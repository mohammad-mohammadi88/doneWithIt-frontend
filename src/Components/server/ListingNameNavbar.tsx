import { serverListing } from "@/APIs/server";
import type { FC } from "react";

interface Props {
    listingId: number;
}

const ListingNameNavbar: FC<Props> = async ({ listingId }) => {
    const { body, ok } = await serverListing.getListing(listingId);

    return (
        <nav className='h-15 w-screen py-1.5 px-2.5 flex justify-center items-center bg-primary text-white'>
            {!ok ? (
                body.error ?? "Could not load listing info"
            ) : (
                <h2 className='line-clamp-2 font-bold'>{body.title}</h2>
            )}
        </nav>
    );
};

export default ListingNameNavbar;
