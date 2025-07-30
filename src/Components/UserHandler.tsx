"use client";

import useAuth from "@/hooks/useAuth";
import { UserType } from "@/types/user";
import { jwtDecode } from "jwt-decode";
import { useLayoutEffect, type FC } from "react";

interface Props {
    token: string;
}

const UserHandler: FC<Props> = ({ token }) => {
    const { storeUser } = useAuth();
    useLayoutEffect(() => {
        const user: UserType = jwtDecode(token);
        if (user) storeUser(user);
    }, [token]);
    return null;
};

export default UserHandler;
