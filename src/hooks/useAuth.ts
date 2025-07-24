import { User } from "@/Context/Provider";
import { useContext } from "react";

const useAuth = () => {
    const res = useContext(User);

    if (!res) return undefined;

    return res;
};

export default useAuth