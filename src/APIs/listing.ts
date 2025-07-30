import { ListingType } from "@/types/listings";
import apiClient from "./client";
import serverFetcher from "./fetcher";
import { TypedResponse } from "@/types/globals";

const endpoint = "listing/";

const getListing = async (id: string): Promise<TypedResponse<ListingType>> => {
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

const markAsSoldOut = (id: string, setProgress: (progress: number) => void) =>
    apiClient.patch(
        endpoint + id,
        {},
        {
            onUploadProgress: (progress) => {
                setProgress(
                    Math.min(0.95, progress.loaded / (progress.total ?? 1))
                );
            },
        }
    );

const listingApi = {
    getListing,
    markAsSoldOut,
};
export default listingApi
