"use client";

import { useState, type FC } from "react";
import clsx from "clsx";

import { ListItem, SendMessage } from ".";

interface Props {
    name: string;
    listings: number;
    userId: number;
    isMyListing: boolean;
    listingId: number;
}

const ListingMessage: FC<Props> = ({
    isMyListing,
    listings,
    name,
    listingId,
}) => {
    const [messageInputShow, setMessageInputShow] = useState<boolean>(false);
    const canSendMessage = messageInputShow && !isMyListing;
    return (
        <div>
            <ListItem
                className={clsx(
                    "mt-10 rounded-full cursor-pointer",
                    !isMyListing && "duration-100 active:bg-light-200"
                )}
                image='/user.jpg'
                onClick={() => setMessageInputShow((c) => !c)}
                subTitle={`${listings} listings`}
                chevron={!isMyListing}
                title={name}
            />
            <SendMessage
                visible={canSendMessage}
                listingId={listingId}
                setVisible={setMessageInputShow}
            />
        </div>
    );
};

export default ListingMessage;
