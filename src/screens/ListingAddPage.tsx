"use client";

import { FC } from "react";

import ChangeListingForm from "@/Forms/logic/ChangeListingForm";
import { clientListings } from "@/APIs/client";

const ListingAddPage: FC = () => (
    <ChangeListingForm
        initialValues={{
            category: 0,
            description: "",
            images: [],
            price: "",
            title: "",
        }}
        pageHeading="Add Listing"
        request={clientListings.postListing}
    />
);

export default ListingAddPage;
