import type { ListingUserInfo } from "@/types/user";
import apiClient from "../client/client";
import { TypedResponse } from "@/types/globals";
import serverFetcher from "./fetcher";

const endpoint = "user/";
const getUser = (id: number | string) =>
    apiClient.get<ListingUserInfo>(endpoint + id);

const getServerUser = async (
    id: string | number
): Promise<TypedResponse<ListingUserInfo>> => {
    const res = await serverFetcher(endpoint + id, {
        cache: "no-store",
    });
    const body = await res.json();
    return {
        body,
        ok: res.ok,
    };
};
const userApi = {
    getServerUser,
    getUser,
}
export default userApi
