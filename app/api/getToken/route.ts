import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const token = (await cookies()).get("x_auth_token");
        if (token) {
            return new NextResponse(token.value, {
                status: 200,
            });
        }
        return new Response("no token", {
            statusText: "there is no token",
            status: 404,
        });
    } catch (e) {
        console.log(e);
        return new Response("Something went wrong while getting token", {
            status: 500,
            statusText: "Something went wrong while getting token",
        });
    }
}
