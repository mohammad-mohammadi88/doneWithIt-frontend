import type { AddListingType } from "@/types/listings";
import { setBody } from "@/utilities";
import apiClient from "./client";

const endpoint = "listings/";

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
    postListing,
};
