import type { ListingUserInfo } from "@/types/user";
import apiClient from "./client";

const endpoint = 'user/';
const getUser = (id:number|string) => apiClient.get<ListingUserInfo>(endpoint+id)

export default {
    getUser
}