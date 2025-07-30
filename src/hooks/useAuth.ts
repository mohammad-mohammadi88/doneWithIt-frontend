import { User } from "@/Context/Provider";
import { useContext } from "react";

const useAuth = () => {
    const res = useContext(User);

    if (!res) throw new Error("no provider");

    return res;
};

export default useAuth