"use client";

import { useLayoutEffect, type FC } from "react";
import { jwtDecode } from "jwt-decode";

import { UserType } from "@/types/user";
import useAuth from "@/hooks/useAuth";

interface Props {
    token: string;
}

const UserHandler: FC<Props> = ({ token }) => {
    const { storeUser } = useAuth();
    useLayoutEffect(() => {
        const user: UserType = jwtDecode(token);
        if (user) storeUser(user);
    }, [token, storeUser]);
    return null;
};

export default UserHandler;
