import type { MessageType } from "@/types/message";
import apiClient from "./client";

const endpoint = "messages/";

const getMessages = () => apiClient.get<MessageType[]>(endpoint);

const getMessageWithId = (id: string) =>
    apiClient.get<MessageType>(endpoint + id);

const deleteMessage = (messageId: number|string) =>
    apiClient.delete(endpoint + messageId);

const sendMessage = (
    content: string,
    data: { userId: string | number } | { listingId: string | number }
) => apiClient.post(endpoint, { content, ...data });

export default {
    deleteMessage,
    getMessages,
    getMessageWithId,
    sendMessage,
};
