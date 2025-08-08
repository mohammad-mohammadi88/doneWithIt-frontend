import type { UserType } from "@/types/user";
import { jwtDecode } from "jwt-decode";

const decodeUser = <T extends string | undefined>(
    token: T
): T extends string ? UserType : undefined =>
    token ? jwtDecode(token) : (undefined as any);

export default decodeUser;
