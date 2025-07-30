"use server"
// import serverToken from "@/APIs/serverToken";
import { redirect } from "next/navigation";
import type { FC, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const layout: FC<Props> = async ({ children }) => {
    const { ok } = {ok:false};
    if (ok) return redirect("/feed");
    return children;
};

export default layout;
