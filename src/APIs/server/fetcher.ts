import defaults from "@/constants/defaults";
import serverToken from "./token";

const serverFetcher = async (url: string, init?: RequestInit) => {
    const tokenRes = await serverToken.getToken();
    const token = tokenRes.ok ? tokenRes.body : undefined;
    const headers: any = init?.headers ?? {};
    if(token) headers["x-auth-token"] = token

    return await fetch(defaults.serverUrl + url, {
        ...init,
        headers,
    });
};

export default serverFetcher;
