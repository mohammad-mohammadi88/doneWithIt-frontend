import { TypedResponse } from "@/types/globals";
import { ListingType } from "@/types/listings";
import serverFetcher from "./fetcher";

const endpoint = "listing/";

const getListing = async (
    id: string | number
): Promise<TypedResponse<ListingType>> => {
    const res = await serverFetcher(endpoint + id, {
        next: { revalidate: 60 },
    });
    const ok = res.ok;
    const body = await res.json();
    return {
        body,
        ok,
    };
};

const listing = {
    getListing,
};
export default listing;
