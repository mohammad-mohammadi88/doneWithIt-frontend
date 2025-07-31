import { redirect } from "next/navigation";
import type { FC, ReactNode } from "react";

import { serverToken } from "@/APIs/server";

interface Props {
    children: ReactNode;
}

const layout: FC<Props> = async ({ children }) => {
    const { ok } = await serverToken.getToken();
    if (ok) return redirect("/feed");
    return children;
};

export default layout;
