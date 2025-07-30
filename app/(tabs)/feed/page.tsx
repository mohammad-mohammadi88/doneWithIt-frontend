import type { Metadata, NextPage } from "next";

import ListingsPage from "@/screens/ListingsPage";
import listingsApi from "@/APIs/listings";

export const metadata: Metadata = {
    title: "Listings Page",
    description: "view others listings and buy if you want",
};

const page: NextPage = async ({ searchParams }: any) => (
    <ListingsPage
        searchParams={searchParams}
        getListingsRequest={listingsApi.getListings}
    />
);

export default page;
