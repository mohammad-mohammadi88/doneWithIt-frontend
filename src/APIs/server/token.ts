import { decodeUser } from "@/utilities";
import { cookies } from "next/headers";

const getToken = async () => {
    try {
        const token = (await cookies()).get("x_auth_token");
        return !token
            ? {
                  ok: false,
                  body: "there is no token",
              }
            : {
                  ok: true,
                  body: token.value,
              };
    } catch (_) {
        return {
            ok: false,
            body: "Something went wrong while getting token",
        };
    }
};

const getSimpleToken = async () => {
    const { ok, body } = await getToken();
    return ok ? body : undefined;
};

const getUserWithToken = async () => {
    const token = await getSimpleToken();
    return token ? decodeUser(token) : undefined;
};

export default {
    getToken,
    getSimpleToken,
    getUserWithToken,
};
