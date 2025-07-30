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
    } catch (e) {
        return {
            ok: false,
            body: "Something went wrong while getting token",
        };
    }
};

export default {
    getToken,
};
