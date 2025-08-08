"use client";

import type { ApiErrorResponse, ApiOkResponse } from "apisauce";
import { useMutation } from "@tanstack/react-query";
import Lottie from "lottie-react";
import {
    useEffect,
    useState,
    type Dispatch,
    type FC,
    type SetStateAction,
} from "react";

import { Input, Button, ErrorMessage } from "@AppComponents";
import loading2Data from "@/animations/loading2.json";
import type { MessageType } from "@/types/message";
import { clientMessages } from "@/APIs/client";
import { DoneModal, Overlay } from ".";

interface Props {
    visible: boolean;
    setVisible?: Dispatch<SetStateAction<boolean>>;
    messageIdentify:
        | { listingId: number | string }
        | { userId: number | string };
}
const SendMessage: FC<Props> = ({ messageIdentify, setVisible, visible }) => {
    const [successModalShow, setSuccessModalShow] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");

    const { data, isPending, mutateAsync, isSuccess } = useMutation({
        mutationFn: async (): Promise<
            | ApiErrorResponse<{ error: string | string[] }>
            | ApiOkResponse<MessageType>
        > => await clientMessages.sendMessage(message, messageIdentify),
    });

    useEffect(() => {
        if (!isPending && isSuccess) {
            if (data?.ok) {
                if (data.data?.id) {
                    setError("");
                    setSuccessModalShow(true);
                }
            } else {
                if (data?.data?.error) {
                    if (typeof data.data.error === "string")
                        setError(data.data.error);
                    else setError(data.data.error?.[0]);
                } else setError("Could not send message");
            }
        }
    }, [isPending, isSuccess, data?.data, data?.ok]);

    if (!visible) return null;
    return (
        <>
            <Overlay visible={isPending}>
                <Lottie
                    animationData={loading2Data}
                    className="h-92"
                    size={10}
                />
            </Overlay>
            <DoneModal
                modalShow={successModalShow}
                onAnimationEnd={() => {
                    setSuccessModalShow(false);
                    setVisible?.(false);
                }}
            />
            {error && <ErrorMessage className="mt-3" title={error} />}
            <div className="w-full my-2 py-5 md:pb-0">
                <Input
                    id="message"
                    placeholder="Send Message..."
                    setValue={setMessage}
                    value={message}
                    required
                />
                <Button
                    className={"bg-secondary mt-5 w-full"}
                    onClick={async () => {
                        if (message === "")
                            return setError(
                                "You can not send a message with empty content"
                            );
                        await mutateAsync();
                        setMessage("");
                    }}
                >
                    Send Message
                </Button>
            </div>
        </>
    );
};

interface WrapperProps {
    listingId?: string | number;
    userId?: string | number;
    visible: boolean;
    setVisible?: Dispatch<SetStateAction<boolean>>;
}
const Wrapper: FC<WrapperProps> = ({ listingId, userId, ...props }) => {
    let messageIdentify;
    if (listingId) messageIdentify = { listingId };
    else if (userId && !listingId) messageIdentify = { userId };
    else return null;
    return <SendMessage messageIdentify={messageIdentify} {...props} />;
};
export default Wrapper;
