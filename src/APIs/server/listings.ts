import type { TypedResponse } from "@/types/globals";
import serverFetcher from "./fetcher";
import { ListingType } from "@/types/listings";

const endpoint = "listings/";
const getListings = async (): Promise<TypedResponse<ListingType[]>> => {
    const res = await serverFetcher(endpoint, { next: { revalidate: 60 } });
    const body = await res.json();
    return {
        body,
        ok: res.ok,
    };
};

const listings = {
    getListings,
};
export default listings;
