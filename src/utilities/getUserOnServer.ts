import { serverToken } from "@/APIs/server";

const getUserOnServer = async () => {
    const { ok, body } = await serverToken.getToken();
    return ok ? body : undefined;
};
export default getUserOnServer;
