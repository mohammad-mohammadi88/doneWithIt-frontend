import { Fragment, lazy, type FC } from "react";

import { serverMessages } from "@/APIs/server";
import { ErrorMessage } from "@AppComponents";
import { PageHeading } from "@Client";

const MessagesPage: FC = async () => {
    const errorClassName = "text-3xl md:text-5xl text-center";

    const { body, ok } = await serverMessages.getMessages();
    const MessageListItem = lazy(
        () => import("@/Components/client/ListItem/MessageListItem")
    );

    const errorTitle = !ok
        ? body?.error ?? "Could not load you messages"
        : body.length === 0
        ? "You don't have any message"
        : "";
    return (
        <main className='bg-white'>
            <PageHeading title='My Messages' className='shadow-lg' />
            <div className='container mx-auto'>
                {errorTitle && (
                    <div className='min-h-screen flex justify-center items-center pt-8'>
                        <ErrorMessage
                            className={errorClassName}
                            title={errorTitle}
                        />
                    </div>
                )}
                {!errorTitle && Array.isArray(body) && (
                    <div>
                        {body.map(
                            (
                                { id, content, fromUser: { name } },
                                index,
                                array
                            ) => (
                                <Fragment key={id}>
                                    <MessageListItem
                                        name={name}
                                        id={id}
                                        content={content}
                                    />
                                    {array.length - 1 > index && (
                                        <div className='bg-light-300 h-px w-full' />
                                    )}
                                </Fragment>
                            )
                        )}
                    </div>
                )}
            </div>
        </main>
    );
};

export default MessagesPage;
