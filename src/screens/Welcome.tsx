import type { FC } from "react";
import Image from "next/image";
import clsx from "clsx";

import { LinkButton } from "@/Components/AppComponents";

const Welcome: FC = () => (
    <div className='overflow-hidden scroll-py-0'>
        <Image
            src={"/welcomeDesktop.png"}
            alt='desktop welcome image'
            width={1000}
            aria-label='welcomeDesktopImage'
            className='w-screen h-screen absolute hidden md:block'
            height={1000}
        />
        <Image
            src={"/welcomeMobile.png"}
            alt='mobile welcome image'
            width={1000}
            aria-label='welcomeMobileImage'
            className='w-screen h-screen absolute md:hidden'
            height={1000}
        />
        <div
            className={clsx(
                "fixed w-screen px-2 md:px-7 z-1",
                "flex flex-wrap flex-col sm:flex-row",
                "bottom-4 md:bottom-7 lg:bottom-10",
                "sm:space-x-4 space-y-4 sm:space-y-0"
            )}
        >
            <LinkButton href={"/welcome/auth/login"} className='bg-primary'>
                Login
            </LinkButton>
            <LinkButton href={"/welcome/auth/register"} className='bg-secondary'>
                Register
            </LinkButton>
        </div>
    </div>
);

export default Welcome;
