"use client";

import { PlusCircleIcon, UserIcon } from "@heroicons/react/16/solid";
import { HomeIcon } from "@heroicons/react/20/solid";
import type { FC } from "react";
import clsx from "clsx";

import { NavLink } from ".";

const Navbar: FC = () => (
    <div
        className={clsx(
            "container fixed z-1001 flex h-18 cursor-pointer flex-row justify-between bg-light-100 right-1/2 translate-x-1/2 shadow shadow-black",
            "bottom-0 py-2 px-2",
            "sm:rounded-2xl",
            "lg:w-auto lg:bottom-auto lg:translate-x-0 lg:top-1/2 lg:-translate-y-1/2 lg:right-8 lg:flex-col lg:px-3 lg:py-6 lg:h-92"
        )}
    >
        <NavLink href='/feed'>
            <HomeIcon width={26} />
            Feed
        </NavLink>

        <NavLink href='/add-listing'>
            <div
                className={clsx(
                    "bg-secondary flex items-center justify-center -translate-y-7 rounded-full w-14 h-14",
                    "lg:translate-y-0"
                )}
            >
                <PlusCircleIcon color='white' width={44} />
            </div>
        </NavLink>

        <NavLink href='/account'>
            <UserIcon width={26} />
            Account
        </NavLink>
    </div>
);

export default Navbar;
