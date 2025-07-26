import type { ListingType } from "@/types/listings";
import apiClient from "./client";
import serverFetcher from "./fetcher";

const endpoint = "listing/";

const getListing = (id: string) => serverFetcher(endpoint + id);

const markAsSoldOut = (id: string, setProgress: (progress: number) => void) =>
    apiClient.patch(endpoint + id, {}, {
        onUploadProgress: (progress) => {
            setProgress(
                Math.min(0.95, progress.loaded / (progress.total ?? 1))
            );
        },
    });

export default {
    getListing,
    markAsSoldOut,
};
