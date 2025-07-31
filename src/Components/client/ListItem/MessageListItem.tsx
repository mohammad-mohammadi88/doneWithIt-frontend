"use client";

import { ApiErrorResponse, ApiOkResponse } from "apisauce";
import { useEffect, useState, type FC } from "react";
import { useMutation } from "@tanstack/react-query";

import { ConfirmDialog, DoneModal, ListItem, Overlay } from "..";
import loading2Data from "@/animations/loading2.json";
import type { MessageType } from "@/types/message";
import { clientMessages } from "@/APIs/client";
import Lottie from "lottie-react";

interface Props {
    name: string;
    content: string;
    id: number;
}

const MessageListItem: FC<Props> = ({ content, id, name }) => {
    const [deleteConfirmShow, setDeleteConfirmShow] = useState<boolean>(false);
    const [successModalShow, setSuccessModalShow] = useState<boolean>(false);

    const { data, isPending, isSuccess, mutateAsync } = useMutation({
        mutationFn: async (): Promise<
            | ApiErrorResponse<{ error: string | string[] }>
            | ApiOkResponse<MessageType>
        > => await clientMessages.deleteMessage(id),
    });
    useEffect(() => {
        if (!isPending && isSuccess) {
            if (data?.ok) {
                if (data.data?.id) {
                    setSuccessModalShow(true);
                }
            } else {
                if (data?.data?.error) {
                    if (typeof data.data.error === "string")
                        window.alert(data.data.error);
                    else window.alert(data.data.error?.[0]);
                } else window.alert("Could not send message");
            }
        }
    }, [isPending, isSuccess]);
    return (
        <>
            <ListItem
                className='p-2 duration-100 hover:bg-light-200 active:bg-light-400'
                image='/user.jpg'
                onLongPress={() => setDeleteConfirmShow(true)}
                priority
                title={name}
                href={`/account/myMessages/${id}`}
                subTitle={content}
            />
            <ConfirmDialog
                isOpen={deleteConfirmShow}
                title='Delete'
                description='Are you sure want to delele this message?'
                onClose={() => setDeleteConfirmShow(false)}
                onConfirm={async () => await mutateAsync()}
            />
            <Overlay visible={isPending}>
                <Lottie
                    animationData={loading2Data}
                    className='h-92'
                    size={10}
                />
            </Overlay>
            <DoneModal
                modalShow={successModalShow}
                onAnimationEnd={() => setSuccessModalShow(false)}
            />
        </>
    );
};

export default MessageListItem;
