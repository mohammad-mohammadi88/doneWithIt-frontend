"use client";

import { useRouter } from "next/navigation";
import { useState, type FC } from "react";
import { mdiLogout } from "@mdi/js";
import Lottie from "lottie-react";
import Icon from "@mdi/react";

import loading2Data from "@/animations/loading2.json";
import { ConfirmDialog, ListItem, Overlay } from ".";
import { clientToken } from "@/APIs/client";
import useAuth from "@/hooks/useAuth";

const Logout: FC = () => {
    const { removeUser } = useAuth();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLogingOut, setIsLogingOut] = useState<boolean>(false);
    const router = useRouter();

    const handleLogout = async () => {
        setIsLogingOut(true);
        removeUser();
        const { ok } = await clientToken.removeToken();
        if (ok) router.push("/welcome");
        setIsLogingOut(false);
    };
    return (
        <>
            <Overlay visible={isLogingOut}>
                <Lottie
                    animationData={loading2Data}
                    className='h-92'
                    size={10}
                />
            </Overlay>
            <ListItem
                className='px-3 active:bg-light-400 duration-100'
                ImageReplaceComponent={
                    <Icon
                        path={mdiLogout}
                        className='bg-orange-400 p-2.5 h-10 rounded-full'
                        color={"white"}
                    />
                }
                title='Log Out'
                onClick={() => setIsOpen(true)}
            />
            <ConfirmDialog
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onConfirm={handleLogout}
                title='Logout'
                description='Are you sure want to log out'
            />
        </>
    );
};

export default Logout;
