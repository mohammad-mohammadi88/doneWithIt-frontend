import apiClient from "./client";

const endpoint = "messages/";

const deleteMessage = (messageId: number|string) =>
    apiClient.delete<any>(endpoint + messageId);

export const sendMessage = (
    content: string,
    data: { userId: string | number } | { listingId: string | number }
) => apiClient.post<any>(endpoint, { content, ...data });

const messagesApi = {
    deleteMessage,
    sendMessage,
};

export default messagesApi