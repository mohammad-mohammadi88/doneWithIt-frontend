import defaults from "@/constants/defaults";
import { create } from "apisauce";
import { tokenApi } from ".";

const apiClient = create({ baseURL: defaults.serverUrl });

apiClient.addAsyncRequestTransform(async (req) => {
    const userToken = await tokenApi.getToken();
    if (!userToken) return;
    if (req.headers) req.headers["x-auth-token"] = userToken;
});

export default apiClient;
