import { UserType } from "@/types/user";
import { jwtDecode } from "jwt-decode";

export default (token: string | undefined): undefined | UserType =>
    token ? jwtDecode(token) : undefined;
