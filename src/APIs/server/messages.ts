import type { TypedResponse } from "@/types/globals";
import type { MessageType } from "@/types/message";
import serverFetcher from "./fetcher";

const endpoint = "messages/";

const getMessages = async (): Promise<TypedResponse<MessageType[]>> => {
    const res = await serverFetcher(endpoint, { cache: "no-store" });
    const body = await res.json();
    return {
        body,
        ok: res.ok,
    };
};

const getMessageWithId = async (
    id: string
): Promise<TypedResponse<MessageType>> => {
    const res = await serverFetcher(endpoint + id, {
        next: { revalidate: 60 },
    });
    const ok = res.ok;
    const body = await res.json();
    return {
        body,
        ok,
    };
};

const messages = {
    getMessageWithId,
    getMessages,
};
export default messages;
