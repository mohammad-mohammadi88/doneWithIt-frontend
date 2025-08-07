export type IconType =
    | "application"
    | "apps"
    | "basketball"
    | "book-open-variant"
    | "camera"
    | "car"
    | "cards"
    | "floor-lamp"
    | "headphones"
    | "shoe-heel";

export interface ServerCategories {
    id: number;
    name: string;
    icon: IconType;
    backgroundColor: string;
    color: string;
}
