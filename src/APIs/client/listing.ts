import apiClient from "./client";

const endpoint = "listing/";

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

export default {
    markAsSoldOut
}