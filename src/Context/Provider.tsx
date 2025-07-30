"use client"
import type { UserType } from "@/types/user";
import {
    createContext,
    useState,
    type FC,
    type ReactNode,
} from "react";

interface UserContext {
    user: UserType | undefined;
    storeUser: (user: UserType) => void;
    removeUser: () => void;
}
export const User = createContext<UserContext | undefined>(undefined);

const Provider: FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserType | undefined>(undefined);
    const storeUser = (user: UserType) => setUser(user);
    const removeUser = () => setUser(undefined);

    return (
        <User.Provider value={{ removeUser, storeUser, user }}>
            {children}
        </User.Provider>
    );
};

export default Provider;
