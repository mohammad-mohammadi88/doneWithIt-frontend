import type { NextPage } from "next";
import serverToken from "@/server/serverToken";
import { redirect } from "next/navigation";

const page: NextPage = async () => {
    const { ok } = await serverToken.getToken();
    if (!ok) redirect("/welcome");
    else redirect("/feed");
};

export default page;
