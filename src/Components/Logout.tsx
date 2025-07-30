"use client";

import { useRouter } from "next/navigation";
import { useState, type FC } from "react";
import { mdiLogout } from "@mdi/js";
import Icon from "@mdi/react";

import loading2Data from "@/animations/loading2.json";
import ConfirmDialog from "./ConfirmDialog";
import useAuth from "@/hooks/useAuth";
import tokenApi from "@/APIs/token";
import ListItem from "./ListItem";
import Overlay from "./Overlay";
import Lottie from "lottie-react";

const Logout: FC = () => {
    const { removeUser } = useAuth();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLogingOut, setIsLogingOut] = useState<boolean>(false)
    const router = useRouter()

    const handleLogout = async () => {
        setIsLogingOut(true)
        removeUser();
        const { ok } = await tokenApi.removeToken();
        if(ok) router.push('/welcome');
        setIsLogingOut(false)
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
