import defaults from "@/constants/defaults";

const getToken = async () => {
    const res = await fetch(defaults.nextServerUrl + "api/getToken");
    const body = await res.text();
    return {
        ok: res.ok,
        body,
    };
};
const removeToken = async () => {
    const res = await fetch(defaults.nextServerUrl + "api/removeToken", {
        method: "DELETE",
    });
    const body = await res.text();
    return {
        ok: res.ok,
        body,
    };
};
const storeToken = async (token: string) => {
    const res = await fetch(defaults.nextServerUrl+"api/storeToken", {
        method: "POST",
        body: JSON.stringify({
            token,
        }),
    });
    const body = await res.text();
    return {
        ok: res.ok,
        body,
    };
};

export default {
    getToken,
    removeToken,
    storeToken,
};
