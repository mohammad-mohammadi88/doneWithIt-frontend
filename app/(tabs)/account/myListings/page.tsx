import type { Metadata, NextPage } from "next";

import ListingsPage from "@/screens/ListingsPage";
import { serverMy } from "@/APIs/server";
import { PageHeading } from "@Client";

export const metadata: Metadata = {
    title: "Your Listings Page",
    description: "View listings that you added",
};

interface Props {
    searchParams: Promise<{
        q: string;
        category: string;
    }>;
}
const page: NextPage<Props> = async ({ searchParams }) => (
    <>
        <div className="!pb-15">
            <PageHeading title="My Listings" />
        </div>
        <ListingsPage
            searchParams={searchParams}
            getListingsRequest={serverMy.getMyListings}
        />
    </>
);

export default page;
