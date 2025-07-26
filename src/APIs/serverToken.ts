import { cookies } from "next/headers";

const getToken = async () => {
    try{

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
    } catch(e) {
        return {
            ok: false,
            body: "Something went wrong while getting token"
        }
    }
};

export default {
    getToken
}