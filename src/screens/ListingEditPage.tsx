"use client";
import { useEffect, useState, type FC } from "react";

import ChangeListingForm from "@/Forms/logic/ChangeListingForm";
import type { ListingChangeInterface } from "@/types/Forms";
import urlToObject from "@/utilities/uriToObject";
import { clientListings } from "@/APIs/client";
import { ImageType } from "@/types/listings";

interface Props {
    listingId: string;
    initialValues: Omit<ListingChangeInterface, "images"> & {
        images: ImageType[];
    };
}

const ListingEditPage: FC<Props> = ({ listingId, initialValues }) => {
    const [images, setImages] = useState<File[]>([]);
    useEffect(() => {
        initialValues.images.forEach(async ({ public_id, url }) => {
            const image = await urlToObject(url, public_id);
            setImages((c) => [...c, image]);
        });
    }, []);
    return (
        <ChangeListingForm
            initialValues={{
                ...initialValues,
                images,
            }}
            pageHeading="Edit Listing"
            request={(value) =>
                clientListings.editListing({ ...value, listingId })
            }
        />
    );
};

export default ListingEditPage;
