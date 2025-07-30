import type { NextPage } from "next";

import ListingsPage from "@/screens/ListingsPage";
import listingsApi from "@/APIs/listings";

const page: NextPage = async ({ searchParams }: any) => (
    <ListingsPage
        searchParams={searchParams}
        getListingsRequest={listingsApi.getListings}
    />
);

export default page;
