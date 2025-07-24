interface User {
    id: number;
    name: string;
    email: string;
}
export interface MessageType {
    id: number;
    listingId?: number;
    dateTime: number;
    content: string;
    fromUser: User;
    toUser: number;
}
