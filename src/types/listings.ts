export type ImageType = Record<"url", string>;

export interface ListingType {
    id: number;
    title: string;
    images: ImageType[];
    price: number;
    categoryId: number;
    userId: number;
    latitude?:number;
    longitude?:number;
    isSold:boolean;
    description: string;
}

export type AddListingType = {
    title: string;
    price: string | number;
    description: string;
    images: ChangeListingImageType[]
    latitude?:number;
    longitude?:number;
    categoryId: number,
    setProgress: (progress: number) => void
}

export type ListingParamsType = Omit<ListingType, "images"> & {
    images: string;
};

export interface ChangeListingImageType {
    mimeType?: string;
    uri: string;
}
