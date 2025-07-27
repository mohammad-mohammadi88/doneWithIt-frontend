
import type { RegisterInterface } from "@/types/Forms";
import apiClient from "./client";

const endpoint = "auth/";

const login = (email: string, password: string) =>
    apiClient.post<any>(endpoint+'login', { email, password });

const register = (data: RegisterInterface) =>
    apiClient.post<any>(endpoint+"register", data);

export default {
    login,
    register
}