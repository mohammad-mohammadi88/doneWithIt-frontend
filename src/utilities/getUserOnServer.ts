import serverToken from "@/server/serverToken";

const getUserOnServer = async () => {
    const { ok, body } = await serverToken.getToken();
    return ok ? body : undefined;
};
export default getUserOnServer
