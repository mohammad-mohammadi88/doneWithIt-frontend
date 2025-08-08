import type { AddListingType, ListingType } from "@/types/listings";
import { setBody } from "@/utilities";
import apiClient from "./client";

const endpoint = "listings/";

const postListing = async (info: AddListingType) =>
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
        }
    );

const deleteListing = async (listingId: string) =>
    await apiClient.delete<ListingType, { error: string }>(
        endpoint + listingId
    );

const listings = {
    deleteListing,
    editListing,
    postListing,
};
export default listings;
