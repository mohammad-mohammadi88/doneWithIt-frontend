import type { FC, ReactNode } from "react";
import { redirect } from "next/navigation";

import { serverToken } from "@/APIs/server";
import { Navbar } from "@Client";

interface Props {
    children: ReactNode;
}

const layout: FC<Props> = async ({ children }) => {
    const { ok } = await serverToken.getToken();
    if (!ok) return redirect("/welcome");
    return (
        <>
            <div className='tab-container'>{children}</div>
            <Navbar />
        </>
    );
};

export default layout;
