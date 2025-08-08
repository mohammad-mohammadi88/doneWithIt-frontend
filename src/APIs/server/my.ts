import type { TypedResponse } from "@/types/globals";
import type { ListingType } from "@/types/listings";
import serverFetcher from "./fetcher";

const endpoint = "my";
const getMyListings = async (): Promise<TypedResponse<ListingType[]>> => {
    const res = await serverFetcher(endpoint, { next: { revalidate: 60 } });
    const body = await res.json();
    return {
        body,
        ok: res.ok,
    };
};

const my = {
    getMyListings,
};
export default my;
