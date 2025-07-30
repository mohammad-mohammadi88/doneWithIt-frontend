import type { Metadata, NextPage } from "next";

import ListingsPage from "@/screens/ListingsPage";
import myApi from "@/APIs/my";

export const metadata: Metadata = {
    title: "Your Listings Page",
    description: "View listings that you added",
};

const page: NextPage = async ({ searchParams }: any) => (
    <ListingsPage
        searchParams={searchParams}
        getListingsRequest={myApi.getMyListings}
    />
);;

export default page;
