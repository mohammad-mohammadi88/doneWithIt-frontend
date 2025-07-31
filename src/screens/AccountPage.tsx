import { mdiEmail, mdiFormatListBulleted } from "@mdi/js";
import { redirect } from "next/navigation";
import type { FC } from "react";
import Icon from "@mdi/react";

import { serverToken } from "@/APIs/server";
import { ListItem, Logout } from "@Client";
import { decodeUser } from "@/utilities";

interface LinksType {
    title: string;
    href: string;
    icon: {
        path: string;
        backgroundColor: string;
    };
}
const AccountPage: FC = async () => {
    const { body, ok } = await serverToken.getToken();
    if (!ok) redirect("/feed");
    const { name, email } = decodeUser(body);
    const links: LinksType[] = [
        {
            title: "My Listings",
            href: "/account/myListings",
            icon: {
                path: mdiFormatListBulleted,
                backgroundColor: "primary",
            },
        },
        {
            title: "My Messages",
            href: "/account/myMessages",
            icon: {
                path: mdiEmail,
                backgroundColor: "secondary",
            },
        },
    ];
    return (
        <div className='bg-light-300 h-screen pt-5'>
            <section className='container mx-auto'>
                <ListItem
                    className='p-2 pr-0'
                    image='/user.jpg'
                    title={name}
                    subTitle={email}
                    chevron={false}
                />
                <br />
                <br />
                {links.map(({ icon: { path, backgroundColor }, ...props }) => (
                    <ListItem
                        className='px-3 active:bg-light-400 duration-100'
                        key={props.title}
                        ImageReplaceComponent={
                            <Icon
                                path={path}
                                className={`bg-${backgroundColor} p-2.5 h-10 rounded-full`}
                                color={"white"}
                            />
                        }
                        {...props}
                    />
                ))}
                <br />
                <br />
                <Logout />
            </section>
        </div>
    );
};

export default AccountPage;
