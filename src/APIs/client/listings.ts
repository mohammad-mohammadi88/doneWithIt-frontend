import type { AddListingType, ListingType } from "@/types/listings";
import { setBody } from "@/utilities";
import apiClient from "./client";

const endpoint = "listings/";

const postListing = async ({ setProgress, ...info }: AddListingType) =>
    await apiClient.post<ListingType, { error: string }>(
        endpoint,
        setBody(info),
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

const editListing = async ({
    setProgress,
    listingId,
    ...info
}: AddListingType & { listingId: string }) =>
    await apiClient.put<ListingType, { error: string }>(
        endpoint + listingId,
        setBody(info),
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: ({ loaded, total }) => {
                setProgress(Math.min(0.95, loaded / (total ?? 1)));
            },
        }
    );

const deleteListing = async (
    listingId: string,
    setProgress: (progress: number) => void
) =>
    await apiClient.delete<ListingType, { error: string }>(
        endpoint + listingId,
        undefined,
        {
            onUploadProgress: ({ loaded, total }) => {
                setProgress(Math.min(0.95, loaded / (total ?? 1)));
            },
        }
    );

export default {
    deleteListing,
    editListing,
    postListing,
};
