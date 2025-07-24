import defaults from "@/constants/defaults";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    const { token } = await req.json();
    try {
        const cookie = await cookies();
        cookie.set("x_auth_token", token, {
            httpOnly: true,
            path: "/",
            maxAge: defaults.tokenLife * 24 * 3600,
        });
        return new Response("the token set successfully! "+token, {
            status: 201,
            statusText: "",
        });
    } catch (e) {
        console.log(e);
        return new Response("Something went wrong while setting token", {
            status: 500,
            statusText: "Something went wrong while setting token",
        });
    }
}
