import type { ListingType } from "@/types/listings";
import apiClient from "./client";

const endpoint = "my";
const getMyListings = () => apiClient.get<ListingType[]>(endpoint);

const myApi = {
    getMyListings,
};
export default myApi;
