import type { Metadata, NextPage } from "next";

import ListingsPage from "@/screens/ListingsPage";
import { serverListings } from "@/APIs/server";

export const metadata: Metadata = {
    title: "Listings Page",
    description: "View others listings and buy if you want",
};

const page: NextPage = async ({ searchParams }: any) => (
    <ListingsPage
        searchParams={searchParams}
        getListingsRequest={serverListings.getListings}
    />
);

export default page;
