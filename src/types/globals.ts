import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface UserLocationType {
    latitude?: number;
    longitude?: number;
}

export type Success<T> = { ok: true; body: T };
export type Failure = { ok: false; body: { error: string } };
export type TypedResponse<T> = Success<T> | Failure;

export interface ListItemProps
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    image?: string;
    title: string;
    onLongPress?: () => void;
    priority?: boolean;
    subTitle?: string;
    chevron?: boolean;
    ImageReplaceComponent?: ReactNode;
}
