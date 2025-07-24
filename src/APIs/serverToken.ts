import { cookies } from "next/headers";

const getToken = async () => {
    const token = (await cookies()).get("x_auth_token");
    if (!token)
        return {
            ok: false,
            body: "there is no token",
        };
    return {
        ok: true,
        body: token.value,
    };
};

export default {
    getToken
}