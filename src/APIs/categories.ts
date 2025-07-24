import type { ServerCategories } from "@/types/categories";
import apiClient from "./client";

const endpoint = "categories";

const getCategories = () => apiClient.get<ServerCategories[]>(endpoint);

export default {
    getCategories,
};
