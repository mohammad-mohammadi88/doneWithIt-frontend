import type { Metadata, NextPage } from "next";

import ListingsPage from "@/screens/ListingsPage";
import { serverListings } from "@/APIs/server";

export const metadata: Metadata = {
    title: "Listings Page",
    description: "View others listings and buy if you want",
};

interface Props {
    searchParams: Promise<{
        q: string;
        category: string;
    }>;
}
const page: NextPage<Props> = async ({ searchParams }) => (
    <ListingsPage
        searchParams={searchParams}
        getListingsRequest={serverListings.getListings}
    />
);

export default page;
