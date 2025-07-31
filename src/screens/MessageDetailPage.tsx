import type { FC } from "react";
import clsx from "clsx";

import { PageHeading, SendMessage } from "@Client";
import { serverMessages } from "@/APIs/server";
import { ErrorMessage } from "@AppComponents";
import { ListingNameNavbar } from "@Server";
import { capitalize } from "@/utilities";

interface Props {
    params: Promise<{ id: string }>;
}
const MessageDetailPage: FC<Props> = async ({ params }) => {
    const listingId = (await params).id;
    const { body, ok } = await serverMessages.getMessageWithId(listingId);
    if (!ok)
        return (
            <ErrorMessage
                className={clsx(
                    "h-screen w-screen flex justify-center items-center",
                    "md:text-3xl lg:text-4xl xl:text-5xl"
                )}
                title={body?.error ?? "Could not load this message!"}
            />
        );
    const { content, fromUser } = body;
    return (
        <main className='h-screen flex flex-col justify-between w-screen'>
            <div>
                <PageHeading title={capitalize(fromUser.name)} />
                <div />
                {body.listingId && (
                    <ListingNameNavbar listingId={body.listingId} />
                )}
                <div className="container mx-auto bg-light-300 max-w-4/5 mt-10 py-5 px-7.5 text-lg rounded-[20px]"><p>{content}</p></div>
            </div>
            <div className='container md:pb-5 lg:pb-10 mx-auto'>
                <div>
                    <SendMessage visible userId={fromUser.id} />
                </div>
            </div>
        </main>
    );
};

export default MessageDetailPage;
