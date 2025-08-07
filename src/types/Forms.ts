import type { FormikHelpers } from "formik";

export type LoginInterface = Record<"password" | "email", string>;

export type RegisterInterface = LoginInterface & { name: string };

export interface ListingChangeInterface {
    title: string;
    price: string | number;
    description: string;
    category: number;
    images: File[];
}

export type FormikOnSubmit<T> = (
    values: any,
    formikHelpers: FormikHelpers<T>
) => void | Promise<void>;
