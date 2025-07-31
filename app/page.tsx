import { redirect } from "next/navigation";
import type { NextPage } from "next";

import { serverToken } from "@/APIs/server";

const page: NextPage = async () => {
    const { ok } = await serverToken.getToken();
    if (!ok) redirect("/welcome");
    else redirect("/feed");
};

export default page;
