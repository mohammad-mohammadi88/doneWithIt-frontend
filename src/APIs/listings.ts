import type { AddListingType, ListingType } from "@/types/listings";
import { setBody } from "@/utilities";
import serverFetcher from "./fetcher";
import apiClient from "./client";

const endpoint = "listings/";
const getListings = async (): Promise<{ body: any; ok: boolean }> => {
    const res = await serverFetcher(endpoint, { next: { revalidate: 60 } });
    const body = await res.json();
    return {
        body,
        ok: res.ok,
    };
};

const postListing = async ({ setProgress, ...info }: AddListingType) => {
    const data = setBody(info);
    return await apiClient.post(endpoint, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progress) => {
            setProgress(
                Math.min(0.95, progress.loaded / (progress.total ?? 1))
            );
        },
    });
};

const editListing = async ({
    setProgress,
    listingId,
    ...info
}: AddListingType & { listingId: string }) => {
    const data = setBody(info);
    return await apiClient.put(endpoint + listingId, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progress) => {
            setProgress(
                Math.min(0.95, progress.loaded / (progress.total ?? 1))
            );
        },
    });
};

const deleteListing = async (
    listingId: string,
    setProgress: (progress: number) => void
) => {
    return await apiClient.delete(endpoint + listingId, undefined, {
        onUploadProgress: (progress) => {
            setProgress(
                Math.min(0.95, progress.loaded / (progress.total ?? 1))
            );
        },
    });
};

export default {
    deleteListing,
    editListing,
    getListings,
    postListing,
};
