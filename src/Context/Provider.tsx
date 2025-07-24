import { UserType } from "@/types/user";
import {
    createContext,
    useState,
    type Dispatch,
    type FC,
    type ReactNode,
    type SetStateAction,
} from "react";

interface UserContext {
    user: UserType | undefined;
    dispatch: Dispatch<SetStateAction<UserType | undefined>>;
}
export const User = createContext<UserContext | undefined>(undefined);

const Provider: FC<{ children: ReactNode }> = ({ children }) => {
    const [user, dispatch] = useState<UserType | undefined>(undefined);

    return <User.Provider value={{ user, dispatch }}>{children}</User.Provider>;
};

export default Provider;
