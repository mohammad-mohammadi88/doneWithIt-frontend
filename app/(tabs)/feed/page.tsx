import type { NextPage } from "next";

import ListingsPage from "@/pages/ListingsPage";
import { listingsApi } from "@/APIs";


const page: NextPage = async ({ searchParams }: any) => (
    <ListingsPage
        searchParams={searchParams}
        getListingsRequest={listingsApi.getListings}
    />
);

export default page;
