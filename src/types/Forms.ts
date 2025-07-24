import type { ChangeListingImageType } from "./listings";
import type { SelectedOption } from "./globals";
import type { FormikHelpers } from "formik";

export type LoginInterface = Record<"password" | "email", string>;

export type RegisterInterface = LoginInterface & { name: string };

export interface ListingChangeInterface {
    title: string;
    price: string | number;
    description: string;
    category: SelectedOption;
    images: ChangeListingImageType[];
}

export type FormikOnSubmit = ((values: any, formikHelpers: FormikHelpers<any>) => void | Promise<any>)